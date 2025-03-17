package controllers

// Controllers handle the incoming HTTP requests and manage the flow of data between the client and the service layer.
// Controllers are resposible for:
// 		parsing request data,
// 		calling appropriate Service methods,
// 		handle response formatting
// 		manage HTTP status code

// func (c *UserController) GetAllUsers(ctx *fiber.Ctx) error {
//     users, err := c.userService.GetAllUsers()
//     if err != nil {
//         return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
//     }
//     return ctx.JSON(users)
// }
