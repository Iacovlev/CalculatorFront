import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
    this.getAll();
  }


  initForm(): void{
    this.form = this.formBuilder.group({
      input: [[''], [Validators.required, Validators.pattern('[0-9]')]],
      result:[['']],
    })
  }

  input: string = '';
  result: string = '';
  history: CalcDTO[] = [];
  show: boolean = true;




  clear() {
    if(this.input !="") {
      this.input = this.input.substr(0, this.input.length -1)
    }
  }

  allClear() {
    this.result = "";
    this.input = "";
  }

    async save(): Promise<void> {
      this.editing = false;
       this.mainPage.input = this.input;
       this.mainPage.result = this.result;

       try {
       const data =  await this.mainPageService.save(this.mainPage)

         if (data.result) {
            this.mainPage.result = data.result
            this.input = this.mainPage.input + "=" + data.result
            console.log(this.input)
        }

        await this.getAll();

      } catch(error) {
        console.log(error)
       }
  }

     async getAll(): Promise<void> {

        try {
          const data =  await this.mainPageService.getAll(this.mainPage)
          this.history = data.reverse()
          console.log(this.history)

        } catch(error) {
          console.log(error)
          }
        }

        async deleteAll(): Promise<void> {

          try {
            this.history = []
            await this.mainPageService.deleteAll()

          } catch(error) {
            console.log(error)
          }
        }

  press(n : string) {
  this.input += n;
  }

  oneKey(event : any) {
  this.input = event.target.value
 }

 pressForHide() { 
 this.show=!this.show;
 }

}





