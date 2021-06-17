import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { FruitService } from 'src/app/providers/fruit.service';
import { Fruit } from '../../../models/fruit';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

@Component({
  selector: 'app-fruit-edit',
  templateUrl: './fruit-edit.component.html',
  styleUrls: ['./fruit-edit.component.scss'],
})
export class FruitEditComponent implements OnInit, OnDestroy {
  fruit: Fruit;
  formGroup: FormGroup;
  subscription = new Subscription();
  titulo: string;
  submitted = false;
  url: any;
  file: File;
  numberMask: any;
  moneyMask: any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private fruitService: FruitService,
    private toaster: ToasterService
  ) {
    this.numberMask = createNumberMask({
      prefix: '',
      allowDecimal: false,
      includeThousandsSeparator: false,
      integerLimit: 4
    });

    this.moneyMask = createNumberMask({
      prefix: '',
      requireDecimal: true,
      allowDecimal: true,
      integerLimit: 8,
      decimalLimit: 2,
    });
  }

  ngOnInit() {
    this.fruit = this.activatedRoute.snapshot.data['fruit'];

    this.formGroup = this.formBuilder.group({
      id: [this.fruit?.id || 0],
      name: [this.fruit?.name, Validators.required],
      price: [this.fruit?.price, Validators.required],
      availableQuantity: [this.fruit?.availableQuantity, Validators.required],
      description: [this.fruit?.description],
    });

    this.configurarImagem();
    this.configureTitle(this.fruit);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  hasError(field: string) {
    return this.formGroup.get(field)?.errors;
  }

  save() {
    this.submitted = true;

    if (this.formGroup.valid) {
      if (!this.file) {
        this.toaster.showToastWarning('Imagem não foi informada.');
        return;
      }

      this.fruitService.salvar(this.formGroup.value, this.file);
    }
  }

  configurarImagem() {
    if (this.fruit && this.fruit.picture) {
      this.url = `data:image/jpeg;base64,${this.fruit.picture}`;

      fetch(this.url)
        .then(res => res.blob())
        .then(res => this.file = new File(new Array(res), ''));
    }
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };

      this.file = event.target.files[0];
    }
  }

  configureTitle(value: Fruit) {
    this.titulo = value?.id > 0 ? 'Editar' : 'Cadastrar';
  }
}
