/**
 * @swagger
 *   tags:
 *     name: Charity
 *     description: Operations related to charities
 */

/**
 * @swagger
 * /charities/all:
 *   get:
 *     summary: Get all charities
 *     description: Retrieve a paginated list of all charities.
 *     tags: [Charity]
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
 *         description: The number of charities to return per page.
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Charities retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   description: The current page number.
 *                 totalCharities:
 *                   type: integer
 *                   description: The total number of charities.
 *                 charities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The charity's unique ID.
 *                       name:
 *                         type: string
 *                         description: The charity's name.
 *                       description:
 *                         type: string
 *                         description: A brief description of the charity.
 *       500:
 *         description: Server error while retrieving charities.
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
 * /charities/{id}:
 *   get:
 *     summary: Get a charity by ID
 *     description: Retrieve a charity's information using its unique ID.
 *     tags: [Charity]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the charity.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Charity retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The charity's unique ID.
 *                 name:
 *                   type: string
 *                   description: The charity's name.
 *                 description:
 *                   type: string
 *                   description: A brief description of the charity.
 *       404:
 *         description: Charity not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Charity not found"
 */

/**
 * @swagger
 * /charities/me:
 *   get:
 *     summary: Get my info
 *     description: Retrieve the authenticated charity's information.
 *     tags: [Charity]
 *     responses:
 *       200:
 *         description: Charity information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The charity's unique ID.
 *                 name:
 *                   type: string
 *                   description: The charity's name.
 *                 description:
 *                   type: string
 *                   description: A brief description of the charity.
 *       404:
 *         description: Charity not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Charity not found"
 */

/**
 * @swagger
 * /charities/{id}:
 *   put:
 *     summary: Update a charity by ID
 *     description: Update the information of a charity using its unique ID.
 *     tags: [Charity]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the charity.
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
 *                 description: The charity's name.
 *               description:
 *                 type: string
 *                 description: A brief description of the charity.
 *     responses:
 *       200:
 *         description: Charity updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The charity's unique ID.
 *                 name:
 *                   type: string
 *                   description: The charity's updated name.
 *                 description:
 *                   type: string
 *                   description: The charity's updated description.
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
