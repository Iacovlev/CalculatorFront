import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { last } from 'rxjs';
import { CalcDTO } from 'src/@core/DTO/CalcDTO';
import { MainPageService } from 'src/@core/services/main-page.service';
import {HttpClient, HttpResponse} from "@angular/common/http";


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
    private http: HttpClient,

  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(data?: CalcDTO): void{
    this.form = this.formBuilder.group({
      input: [[data && data.input ? data.input : ''], [Validators.required, Validators.pattern('[0-9]')]],
      result:[[data && data.result ? data.result : '']],
    })
  }



  input: string = '';
  result: string = '';

  pressNum(num :string) {
    if (num == ".") {
      if (this.input != ""){

        const lastNum = this.getLastOperand()

        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }


    if (num == "0") {
      if (this.input == "") {
        return;
      }

      const PrevKey = this.input[this.input.length -1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+') {
        return;
      }
    }
  }


  getLastOperand() {
    let pos: number;
    pos = this.input.toString().lastIndexOf("+")

    if(this.input.toString().lastIndexOf("-") > pos) pos = this.input.lastIndexOf("-")
    if(this.input.toString().lastIndexOf("*") > pos) pos = this.input.lastIndexOf("*")
    if(this.input.toString().lastIndexOf("/") > pos) pos = this.input.lastIndexOf("/")

    return this.input.substr(pos+1)

  }


  pressOperator(op: string) {

    const lastKey = this.input[this.input.length -1];
    if (lastKey === "/" || lastKey === "*" || lastKey === "-" || lastKey === "+") {
        return;
    }



  }

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
         console.log(this.mainPage)
      this.mainPageService.save(this.mainPage).subscribe(data => {
        if (data.result) {
        console.log(data.result)
          this.mainPage.result = data.result
          console.log(this.mainPage.result)
          this.input = this.mainPage.input + "=" + data.result
//          this.result = data.result


        }
      })
    }

  press(n : string) {
  this.input += n;
  console.log(this.input);
  }

  oneKey(event : any) {
  this.input = event.target.value
 }

 getAnswer() {

 }

}





