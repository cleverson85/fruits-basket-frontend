import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

enum Type {
  error = 'toast-error',
  info = 'toast-info',
  success = 'toast-success',
  warning = 'toast-warning',
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  options: IndividualConfig;

  constructor(private toastr: ToastrService) {
      this.options = this.toastr.toastrConfig;
      this.options.timeOut = 5000;
      this.options.progressBar = true;
  }

  showToastError(message: string) {
      this.toastr.error(message, 'Erro', this.options);
  }

  showToastSuccess(message: string) {
    this.toastr.success(message, 'Sucesso', this.options);
  }

  showToastWarning(message: string) {
    this.toastr.warning(message, 'Atenção', this.options);
  }
}
