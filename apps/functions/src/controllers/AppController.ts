import { Get, JsonController } from "routing-controllers";
import { Service } from "typedi";

@Service()
@JsonController()
export default class AppController {
  @Get("/")
  hello() {
    return "Hello world";
  }
}
