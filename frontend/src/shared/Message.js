import toastr from "toastr";
import "toastr/build/toastr.css";

class Message {
  static Succes(arg) {
    toastr.options.toastClass = "toastr";
    toastr.options.positionClass = "toast-bottom-left";

    toastr.success(arg);
  }

  static Error(arg) {
    toastr.options.toastClass = "toastr";
    toastr.options.positionClass = "toast-bottom-left";

    toastr.error(arg);
  }
}

export default Message;
