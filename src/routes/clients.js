// routes/clients.js
const express = require('express');
const router = express.Router();
const {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
} = require('../controllers/clientsController');

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management API
 */

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Retrieve all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Successfully retrieved all clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   client_id:
 *                     type: integer
 *                     example: 101
 *                   client_name:
 *                     type: string
 *                     example: "Ola Nordmann"
 *                   email:
 *                     type: string
 *                     example: "ola.nordmann@digitalpathsnorway.no"
 *                   phone:
 *                     type: string
 *                     example: "+47 451 23 789"
 */
router.get('/', getAllClients);

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Retrieve a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the client to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved client details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client_id:
 *                   type: integer
 *                   example: 101
 *                 name:
 *                   type: string
 *                   example: "Ola Nordmann"
 *                 email:
 *                   type: string
 *                   example: "ola.nordmann@digitalpathsnorway.no"
 *                 phone:
 *                   type: string
 *                   example: "+47 451 23 789"
 *       404:
 *         description: Client not found
 */
router.get('/:id', getClientById);

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_name:
 *                 type: string
 *                 example: "Kari Nordmann"
 *               email:
 *                 type: string
 *                 example: "kari.nordmann@digitalpathsnorway.no"
 *               mobile_number:
 *                 type: string
 *                 example: "+47 482 33 567"
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client_id:
 *                   type: integer
 *                   example: 102
 *                 name:
 *                   type: string
 *                   example: "Kari Nordmann"
 *                 email:
 *                   type: string
 *                   example: "kari.nordmann@digitalpathsnorway.no"
 *                 mobile_number:
 *                   type: string
 *                   example: "+47 482 33 567"
 */
router.post('/', createClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Update a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the client to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Per Hansen"
 *               email:
 *                 type: string
 *                 example: "per.hansen@digitalpathsnorway.no"
 *               phone:
 *                 type: string
 *                 example: "+47 462 11 234"
 *     responses:
 *       200:
 *         description: Client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client_id:
 *                   type: integer
 *                   example: 103
 *                 name:
 *                   type: string
 *                   example: "Per Hansen"
 *                 email:
 *                   type: string
 *                   example: "per.hansen@digitalpathsnorway.no"
 *                 phone:
 *                   type: string
 *                   example: "+47 462 11 234"
 *       404:
 *         description: Client not found
 */
router.put('/:id', updateClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Delete a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the client to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client deleted successfully"
 *                 client:
 *                   type: object
 *                   properties:
 *                     client_id:
 *                       type: integer
 *                       example: 104
 *                     name:
 *                       type: string
 *                       example: "Lise Ødegård"
 *                     email:
 *                       type: string
 *                       example: "lise.odegaard@digitalpathsnorway.no"
 *                     phone:
 *                       type: string
 *                       example: "+47 401 88 123"
 *       404:
 *         description: Client not found
 */
router.delete('/:id', deleteClient);

module.exports = router;