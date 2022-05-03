import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { last } from 'rxjs';
import { CalcDTO } from 'src/@core/DTO/CalcDTO';
import { MainPageService } from 'src/@core/services/main-page.service';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})

  export class CalculatorComponent implements OnInit {
  form!: FormGroup;
  mainPage: CalcDTO = new CalcDTO();
  editing: boolean = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private mainPageService: MainPageService,
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.form = this.formBuilder.group({
      input: [[this.input ? this.input : ''], [Validators.required, Validators.pattern('[0-9]')]],
      result:[[this.result ? this.result : '']],
    })
  }

  input: string = '';
  result: string = '';


  clear() {
    if(this.input !="") {
      this.input = this.input.substr(0, this.input.length -1)
    }
  }

  allClear() {
    this.result = "";
    this.input = "";
  }

    save(): void {
    this.editing = false;
       this.mainPage.input = this.input;
       this.mainPage.result = this.result;

       this.mainPageService.save(this.mainPage).subscribe(data => {
          if (data.result) {
            this.mainPage.result = data.result
            this.input = this.mainPage.input + "=" + data.result
  //          this.result = data.result
          }
      })
    }

  press(n : string) {
  this.input += n;
  }

  oneKey(event : any) {
  this.input = event.target.value
 }

}





