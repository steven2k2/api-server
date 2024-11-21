const db = require('../db'); // Database connection

// Get all clients
const getAllClients = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM clients ORDER BY client_id');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
};

// Get a client by ID
const getClientById = async (req, res) => {
    const clientId = parseInt(req.params.id, 10);
    if (isNaN(clientId)) {
        return res.status(400).json({ error: 'Invalid client ID' });
    }

    try {
        const result = await db.query('SELECT * FROM clients WHERE client_id = $1', [clientId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(`Error fetching client with ID ${clientId}:`, error);
        res.status(500).json({ error: 'Failed to fetch client' });
    }
};

// Create a new client
const createClient = async (req, res) => {
    const { client_name, email, mobile_number } = req.body;

    if (!client_name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
        const result = await db.query(
            'INSERT INTO clients (client_name, email, mobile_number) VALUES ($1, $2, $3) RETURNING *',
            [client_name, email, mobile_number || null]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ error: 'Failed to create client' });
    }
};

// Update a client by ID
const updateClient = async (req, res) => {
    const clientId = parseInt(req.params.id, 10);
    const { client_name, email, mobile_number } = req.body;

    if (isNaN(clientId)) {
        return res.status(400).json({ error: 'Invalid client ID' });
    }

    try {
        const result = await db.query(
            'UPDATE clients SET client_name = COALESCE($1, client_name), email = COALESCE($2, email), mobile_number = COALESCE($3, mobile_number) WHERE client_id = $4 RETURNING *',
            [client_name, email, mobile_number, clientId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(`Error updating client with ID ${clientId}:`, error);
        res.status(500).json({ error: 'Failed to update client' });
    }
};

// Delete a client by ID
const deleteClient = async (req, res) => {
    const clientId = parseInt(req.params.id, 10);
    if (isNaN(clientId)) {
        return res.status(400).json({ error: 'Invalid client ID' });
    }

    try {
        const result = await db.query('DELETE FROM clients WHERE client_id = $1 RETURNING *', [clientId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.status(200).json({ message: 'Client deleted successfully', client: result.rows[0] });
    } catch (error) {
        console.error(`Error deleting client with ID ${clientId}:`, error);
        res.status(500).json({ error: 'Failed to delete client' });
    }
};

module.exports = { getAllClients, getClientById, createClient, updateClient, deleteClient };