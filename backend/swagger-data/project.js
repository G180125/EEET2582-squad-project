/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API for managing charity projects
 */

/**
 * @swagger
 * /projects/all:
 *   get:
 *     summary: Retrieve all projects
 *     description: Retrieve a paginated list of all projects.
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: A list of projects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /projects/active:
 *   get:
 *     summary: Retrieve active projects
 *     description: Fetch a paginated list of active projects with optional filtering by status and search term.
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter projects by status (e.g., active, completed).
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search term to filter projects by title or description.
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1).
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of projects to return per page (default is 10).
 *     responses:
 *       200:
 *         description: A list of active projects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project' # Reference to the Project schema
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *       400:
 *         description: Bad request, invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid status or pagination parameters.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching active projects.
 */

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Retrieve a project by ID
 *     description: Retrieve detailed information for a specific project by its ID.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID.
 *     responses:
 *       200:
 *         description: Project details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found.
 */

/**
 * @swagger
 * /projects/my:
 *   get:
 *     summary: Retrieve projects based on user role
 *     description: Retrieve a paginated list of projects that the authenticated user is involved with.
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: A list of projects associated with the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     description: Create a new project with the provided details.
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 project:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project
 *     description: Update an existing project by its ID.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 project:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /projects/{id}/activate:
 *   patch:
 *     summary: Activate a pending project
 *     description: Activates a pending project for admin users.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID.
 *     responses:
 *       200:
 *         description: Project activated successfully.
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /projects/{id}/halt:
 *   patch:
 *     summary: Halt an active project
 *     description: Halts an active project for the charity owner.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID.
 *     responses:
 *       200:
 *         description: Project halted successfully.
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /projects/{id}/close:
 *   patch:
 *     summary: Close a project
 *     description: Closes a project for the charity owner.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID.
 *     responses:
 *       200:
 *         description: Project closed successfully.
 *       400:
 *         description: Bad request.
 */

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     description: Deletes a project by its ID for admin users.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID.
 *     responses:
 *       200:
 *         description: Project deleted successfully.
 *       400:
 *         description: Bad request.
 */