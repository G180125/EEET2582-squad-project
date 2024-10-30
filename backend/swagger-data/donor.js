/**
 * @swagger
 *   tags:
 *     name: Donor
 *     description: Operations related to donors
 */

/**
 * @swagger
 * /donors/all:
 *   get:
 *     summary: Get all donors
 *     description: Retrieve a paginated list of all donors.
 *     tags: [Donor]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: The page number to retrieve.
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: The number of donors to return per page.
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Donors retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   description: The current page number.
 *                 totalDonors:
 *                   type: integer
 *                   description: The total number of donors.
 *                 donors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The donor's unique ID.
 *                       name:
 *                         type: string
 *                         description: The donor's name.
 *                       email:
 *                         type: string
 *                         description: The donor's email address.
 *       500:
 *         description: Server error while retrieving donors.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message"
 */

/**
 * @swagger
 * /donors/{id}:
 *   get:
 *     summary: Get a donor by ID
 *     description: Retrieve a donor's information using their unique ID.
 *     tags: [Donor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the donor.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Donor retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The donor's unique ID.
 *                 name:
 *                   type: string
 *                   description: The donor's name.
 *                 email:
 *                   type: string
 *                   description: The donor's email address.
 *       404:
 *         description: Donor not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Donor not found"
 */

/**
 * @swagger
 * /donors/me:
 *   get:
 *     summary: Get my info
 *     description: Retrieve the authenticated donor's information.
 *     tags: [Donor]
 *     responses:
 *       200:
 *         description: Donor information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The donor's unique ID.
 *                 name:
 *                   type: string
 *                   description: The donor's name.
 *                 email:
 *                   type: string
 *                   description: The donor's email address.
 *       404:
 *         description: Donor not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Donor not found"
 */

/**
 * @swagger
 * /donors/{id}:
 *   put:
 *     summary: Update a donor by ID
 *     description: Update the information of a donor using their unique ID.
 *     tags: [Donor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the donor.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The donor's name.
 *               email:
 *                 type: string
 *                 description: The donor's email address.
 *     responses:
 *       200:
 *         description: Donor updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The donor's unique ID.
 *                 name:
 *                   type: string
 *                   description: The donor's updated name.
 *                 email:
 *                   type: string
 *                   description: The donor's updated email address.
 *       400:
 *         description: Bad request due to invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message"
 */
