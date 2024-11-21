const db = require('../db'); // Database connection

// Get all travel logs
const getAllTravelLogs = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM travel_logs ORDER BY travel_id');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching travel logs:', error);
        res.status(500).json({ error: 'Failed to fetch travel logs' });
    }
};

// Get a travel log by ID
const getTravelLogById = async (req, res) => {
    const travelId = parseInt(req.params.id, 10);
    if (isNaN(travelId)) {
        return res.status(400).json({ error: 'Invalid travel ID' });
    }

    try {
        const result = await db.query('SELECT * FROM travel_logs WHERE travel_id = $1', [travelId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Travel log not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(`Error fetching travel log with ID ${travelId}:`, error);
        res.status(500).json({ error: 'Failed to fetch travel log' });
    }
};

// Create a new travel log
const createTravelLog = async (req, res) => {
    const {
        client_id,
        travel_date,
        start_address,
        end_address,
        distance_km,
        travel_reason,
        notes,
        billing_period_id,
    } = req.body;

    if (!travel_date || !start_address || !end_address || !distance_km) {
        return res.status(400).json({
            error: 'travel_date, start_address, end_address, and distance_km are required',
        });
    }

    try {
        const result = await db.query(
            `INSERT INTO travel_logs (client_id, travel_date, start_address, end_address, distance_km, travel_reason, notes, billing_period_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [client_id || null, travel_date, start_address, end_address, distance_km, travel_reason || null, notes || null, billing_period_id || null]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating travel log:', error);
        res.status(500).json({ error: 'Failed to create travel log' });
    }
};

// Update a travel log by ID
const updateTravelLog = async (req, res) => {
    const travelId = parseInt(req.params.id, 10);
    const {
        client_id,
        travel_date,
        start_address,
        end_address,
        distance_km,
        travel_reason,
        notes,
        billing_period_id,
    } = req.body;

    if (isNaN(travelId)) {
        return res.status(400).json({ error: 'Invalid travel ID' });
    }

    try {
        const result = await db.query(
            `UPDATE travel_logs
       SET client_id = COALESCE($1, client_id),
           travel_date = COALESCE($2, travel_date),
           start_address = COALESCE($3, start_address),
           end_address = COALESCE($4, end_address),
           distance_km = COALESCE($5, distance_km),
           travel_reason = COALESCE($6, travel_reason),
           notes = COALESCE($7, notes),
           billing_period_id = COALESCE($8, billing_period_id)
       WHERE travel_id = $9 RETURNING *`,
            [client_id, travel_date, start_address, end_address, distance_km, travel_reason, notes, billing_period_id, travelId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Travel log not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(`Error updating travel log with ID ${travelId}:`, error);
        res.status(500).json({ error: 'Failed to update travel log' });
    }
};

// Delete a travel log by ID
const deleteTravelLog = async (req, res) => {
    const travelId = parseInt(req.params.id, 10);
    if (isNaN(travelId)) {
        return res.status(400).json({ error: 'Invalid travel ID' });
    }

    try {
        const result = await db.query('DELETE FROM travel_logs WHERE travel_id = $1 RETURNING *', [travelId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Travel log not found' });
        }
        res.status(200).json({ message: 'Travel log deleted successfully', travel_log: result.rows[0] });
    } catch (error) {
        console.error(`Error deleting travel log with ID ${travelId}:`, error);
        res.status(500).json({ error: 'Failed to delete travel log' });
    }
};

module.exports = {
    getAllTravelLogs,
    getTravelLogById,
    createTravelLog,
    updateTravelLog,
    deleteTravelLog,
};