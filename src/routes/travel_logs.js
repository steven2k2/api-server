// routes/travel_logs.js
const express = require('express');
const router = express.Router();
const {
    getAllTravelLogs,
    getTravelLogById,
    createTravelLog,
    updateTravelLog,
    deleteTravelLog,
} = require('../controllers/travelLogsController');

/**
 * @swagger
 * tags:
 *   name: Travel Logs
 *   description: Travel log management API
 */

/**
 * @swagger
 * /api/travel_logs:
 *   get:
 *     summary: Retrieve all travel logs
 *     tags: [Travel Logs]
 *     responses:
 *       200:
 *         description: Successfully retrieved all travel logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   travel_id:
 *                     type: integer
 *                     example: 1
 *                   client_id:
 *                     type: integer
 *                     example: 1
 *                   travel_date:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-10"
 *                   start_address:
 *                     type: string
 *                     example: "Kirkegata 56, Oslo"
 *                   end_address:
 *                     type: string
 *                     example: "Holbergs gate 13, Bergen"
 *                   distance_km:
 *                     type: number
 *                     format: double
 *                     example: 120.50
 *                   travel_reason:
 *                     type: string
 *                     example: "Client Meeting"
 *                   notes:
 *                     type: string
 *                     example: "Met with client to discuss project requirements"
 *                   billing_period_id:
 *                     type: integer
 *                     example: 1
 */
router.get('/', getAllTravelLogs);

/**
 * @swagger
 * /api/travel_logs/{id}:
 *   get:
 *     summary: Retrieve a travel log by ID
 *     tags: [Travel Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the travel log to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved travel log details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 travel_id:
 *                   type: integer
 *                   example: 1
 *                 client_id:
 *                   type: integer
 *                   example: 1
 *                 travel_date:
 *                   type: string
 *                   format: date
 *                   example: "2024-01-10"
 *                 start_address:
 *                   type: string
 *                   example: "Kirkegata 56, Oslo"
 *                 end_address:
 *                   type: string
 *                   example: "Holbergs gate 13, Bergen"
 *                 distance_km:
 *                   type: number
 *                   format: double
 *                   example: 120.50
 *                 travel_reason:
 *                   type: string
 *                   example: "Client Meeting"
 *                 notes:
 *                   type: string
 *                   example: "Met with client to discuss project requirements"
 *                 billing_period_id:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Travel log not found
 */
router.get('/:id', getTravelLogById);

/**
 * @swagger
 * /api/travel_logs:
 *   post:
 *     summary: Create a new travel log
 *     tags: [Travel Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: integer
 *                 example: 1
 *               travel_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-03-15"
 *               start_address:
 *                 type: string
 *                 example: "Kirkegata 56, Oslo"
 *               end_address:
 *                 type: string
 *                 example: "Storgata 25, Trondheim"
 *               distance_km:
 *                 type: number
 *                 format: double
 *                 example: 180.00
 *               travel_reason:
 *                 type: string
 *                 example: "Follow-up"
 *               notes:
 *                 type: string
 *                 example: "Follow-up on previous consultation"
 *               billing_period_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Travel log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 travel_id:
 *                   type: integer
 *                   example: 5
 *                 client_id:
 *                   type: integer
 *                   example: 1
 *                 travel_date:
 *                   type: string
 *                   format: date
 *                   example: "2024-03-15"
 *                 start_address:
 *                   type: string
 *                   example: "Kirkegata 56, Oslo"
 *                 end_address:
 *                   type: string
 *                   example: "Storgata 25, Trondheim"
 *                 distance_km:
 *                   type: number
 *                   format: double
 *                   example: 180.00
 *                 travel_reason:
 *                   type: string
 *                   example: "Follow-up"
 *                 notes:
 *                   type: string
 *                   example: "Follow-up on previous consultation"
 *                 billing_period_id:
 *                   type: integer
 *                   example: 3
 */
router.post('/', createTravelLog);

/**
 * @swagger
 * /api/travel_logs/{id}:
 *   put:
 *     summary: Update a travel log by ID
 *     tags: [Travel Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the travel log to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: integer
 *                 example: 2
 *               travel_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-04-15"
 *               start_address:
 *                 type: string
 *                 example: "Storgata 25, Trondheim"
 *               end_address:
 *                 type: string
 *                 example: "Holbergs gate 13, Bergen"
 *               distance_km:
 *                 type: number
 *                 format: double
 *                 example: 150.00
 *               travel_reason:
 *                 type: string
 *                 example: "Consultation"
 *               notes:
 *                 type: string
 *                 example: "Updated travel details"
 *               billing_period_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Travel log updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 travel_id:
 *                   type: integer
 *                   example: 3
 *                 client_id:
 *                   type: integer
 *                   example: 2
 *                 travel_date:
 *                   type: string
 *                   format: date
 *                   example: "2024-04-15"
 *                 start_address:
 *                   type: string
 *                   example: "Storgata 25, Trondheim"
 *                 end_address:
 *                   type: string
 *                   example: "Holbergs gate 13, Bergen"
 *                 distance_km:
 *                   type: number
 *                   format: double
 *                   example: 150.00
 *                 travel_reason:
 *                   type: string
 *                   example: "Consultation"
 *                 notes:
 *                   type: string
 *                   example: "Updated travel details"
 *                 billing_period_id:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: Travel log not found
 */
router.put('/:id', updateTravelLog);

/**
 * @swagger
 * /api/travel_logs/{id}:
 *   delete:
 *     summary: Delete a travel log by ID
 *     tags: [Travel Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the travel log to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Travel log deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Travel log deleted successfully"
 *                 travel_log:
 *                   type: object
 *                   properties:
 *                     travel_id:
 *                       type: integer
 *                       example: 3
 *                     client_id:
 *                       type: integer
 *                       example: 2
 *                     travel_date:
 *                       type: string
 *                       format: date
 *                       example: "2024-04-15"
 *                     start_address:
 *                       type: string
 *                       example: "Storgata 25, Trondheim"
 *                     end_address:
 *                       type: string
 *                       example: "Holbergs gate 13, Bergen"
 *                     distance_km:
 *                       type: number
 *                       format: double
 *                       example: 150.00
 *                     travel_reason:
 *                       type: string
 *                       example: "Consultation"
 *                     notes:
 *                       type: string
 *                       example: "Updated travel details"
 *                     billing_period_id:
 *                       type: integer
 *                       example: 2
 *       404:
 *         description: Travel log not found
 */
router.delete('/:id', deleteTravelLog);

module.exports = router;