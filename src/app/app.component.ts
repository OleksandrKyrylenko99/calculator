import { Component } from '@angular/core';
import { MyCalculatorComponent } from './my-calculator/my-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [MyCalculatorComponent]
})
export class AppComponent {
  title = 'Calculator';
}




































// export class MyCalculatorComponent implements OnInit {
//   // 123 456 789 + 123 456 789 = 245 913 578 + % не коректне значення
//   // при записі 1 234 не додається знак мінус
//   public arrayCalculatorNumbers : string [][] =  [ ['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'] ]

//   // Значення на screen калькулятора
//   public calcValue : WritableSignal<any> = signal('0')
//   // Введенні числа
//   public currentCalcValue: string = '';
//   public calcNumber : string = 'noValue' 
//   public firstNumber : number = 0
//   public secondNumber : number = 0
//   public action : string = ''
//   public DIVISOR : number = 100
//   public historyOfComputing : CalculatorGroup [] = []
//   private eventTarget? : HTMLElement
//   public MAX_LENGTH_CALC_VALUE : number = 4
//   isDisabled : WritableSignal<boolean> = signal(true) 
//   endOfDataEntry : boolean = false
//   private decimalPipe = inject(DecimalPipe)
//   public isError : WritableSignal<boolean> = signal(false) 
//   public calcError : WritableSignal<string> = signal('Помилка')
//   constructor(){
//     const MAX_LENGTH_CALC_VALUE = 9
//     effect(() => {
//       const calcValue = this.calcValue()
//       // let regular = this.calcValue().replace(/(\d)(?=(\d{3})+(?![\d.,]))/g, '$1 ')
//       // if (/\./.test(regular)) regular = regular.replace(/\s(?=\d)/g, '')
//       // this.calcValue.set(regular)
//       if(calcValue.replace(/[^\d]/g, "").length >= 9) this.isDisabled.set(false)

//       // if (this.historyOfComputing.length > MAX_LENGTH_CALC_VALUE) {
//       //   this.historyOfComputing = this.historyOfComputing.slice(1)
//       //   console.log(this.historyOfComputing);
//       // }

//         // this.calcValue.set(this.calcValue().slice(0,MAX_LENGTH_CALC_VALUE))

//     },{allowSignalWrites: true});
//   }
//   ngOnInit(): void {
//     registerLocaleData(localeUk, 'uk', localeUkExtra)
//   }

//   public onInputChange(event : Event){
//     console.log(event);
    
//   }
  
  
//   public onClickValue(event : Event) : void{
//     this.eventTarget = event.target as HTMLElement
//     let targetElement = this.eventTarget.innerText

//     if(targetElement === 'AC') this.clearAttributeCalculator()

//     if(this.eventTarget.closest('.plus-minus')){
//       this.isDisabled.set(true)
//       let number
//       if(this.calcValue() !== '0'){
//         number = parseFloat(this.calcValue())
//         number = -number
//         this.assigningDifferentValueToVariables(number)
//       }
//     }   

//     if(targetElement === '%'){
//       this.isDisabled.set(true)
//       if(this.firstNumber === 0 || this.calcValue() === 'Помилка') return
//       if(this.calcNumber === this.secondNumber.toString() && this.calcValue().toString() === this.firstNumber.toString()){
//           this.action = ''
//           this.secondNumber = 0
//           this.calcNumber = 'noValue'
//       }
//       this.calcValue.set(this.findingTheResultOfPercentageOfNumber())
//       this.calcNumber = this.calcValue()
//     }

//     if(this.eventTarget.getAttribute('data-type') === 'number'){
//       if(targetElement === '0' && this.calcValue() === '0') return
//       if(targetElement === '.' && this.calcValue().includes('.')) return
//       if(this.isDisabled()) this.onNumberClick(targetElement)
//     }

//     if(this.eventTarget.getAttribute('data-type') === 'actions'){ 
//       this.isDisabled.set(true)     
//       if(this.action !== '' && this.calcValue().toString() !== this.firstNumber.toString()){
//         this.compute()
//         if(this.firstNumber !== 0 && this.secondNumber !== 0){        
//           this.secondNumber = 0
//           this.calcNumber = 'noValue'
//           this.action = targetElement
//           return
//         } 
//       }
//       if(this.action !== '' && Math.abs(this.firstNumber) === Math.abs(this.secondNumber)) this.compute()
//       this.action = targetElement
//       this.calcNumber = 'noValue'
//       return
//     }

//     if(targetElement === '=' && this.action !== ''){
//       this.isDisabled.set(true)
//       this.compute()
//       this.endOfDataEntry = true
//       // console.log('=========================');
//       // console.log('firstNumber = ' + this.firstNumber);
//       // console.log('secondNumber = ' + this.secondNumber);
//       // console.log('calcNumber = ' + this.calcNumber);
//       // console.log('calcValue = ' + this.calcValue());
//       // console.log('=========================');
//     }
//   }

//   public clearAttributeCalculator () : void{
//     this.firstNumber = 0
//     this.secondNumber = 0
//     this.calcValue.set('0')
//     this.calcNumber = 'noValue'
//     this.action = ''
//     this.isDisabled.set(true)
//     // this.historyOfComputing = []
//   }
//   public findingTheResultOfPercentageOfNumber () : string {
//     let rate = this.secondNumber === 0 ? 1 : this.secondNumber
//     let result = 0
//     if (this.firstNumber !== 0 && this.action === '') {
//       result = this.firstNumber * rate / this.DIVISOR
//       this.firstNumber = result
//       return result.toString()
//     } else if (this.firstNumber !== 0 && this.secondNumber !== 0 || this.secondNumber === 0) {
//       if(this.secondNumber === 0 ) rate = this.firstNumber
//       switch (this.action) {
//         case CalculatorOperations.plus:
//         case CalculatorOperations.minus:
//           result = this.firstNumber * rate / this.DIVISOR
//           break;
//         case CalculatorOperations.multiply:
//         case CalculatorOperations.divide:
//           result = rate / this.DIVISOR
//           break;
//       }
//       this.secondNumber = result
//       return result.toString()
//     }
//     return '0'
//   }

//   public assigningDifferentValueToVariables (number : number) : void {
//     if(this.calcValue() === this.firstNumber.toString()){
//       this.calcValue.set(number.toString())
//       this.firstNumber = number      
//       this.calcNumber = this.firstNumber.toString()
//     }
//     else if(this.calcValue() === Math.abs(this.secondNumber).toString()){
//       this.calcValue.set(number.toString())
//       this.calcNumber = number.toString()
//       this.calcNumber = this.calcNumber.toString()
//     }
//   }

//   public onNumberClick(value : string) : void{
//     if(value === '.' && this.calcValue() ==='0') {
//       this.calcValue.update(val => val + value)
//       this.calcNumber = this.calcValue()
//       return
//     }
//     if(this.calcNumber === this.secondNumber.toString() 
//       && this.calcValue() === this.firstNumber.toString()
//       || this.calcValue() === 'Помилка') this.clearAttributeCalculator()

//     if(this.calcNumber !== 'noValue') this.calcNumber = this.calcNumber + value
//     else this.calcNumber = value
    
//     this.calcValue.set(this.calcNumber)
//     if(typeof(this.calcValue() === 'number'))
//     this.calcValue.set(this.decimalPipe.transform(Number(this.calcValue()),'1.0-50', 'uk'))

//     if(this.secondNumber === 0 && this.action === '') this.firstNumber = parseFloat(this.calcValue())
//     else this.secondNumber = parseFloat(this.calcValue())
//   }

//   public findingTheResultOfTheCalculation() : StringOrNumber{    
//     if(this.calcNumber === 'noValue') {
//       this.secondNumber = this.firstNumber
//       this.calcNumber = this.secondNumber.toString() 
//     }
//     switch(this.action){
//       case CalculatorOperations.plus : return this.firstNumber + this.secondNumber
//       case CalculatorOperations.minus : return this.firstNumber - this.secondNumber
//       case CalculatorOperations.multiply : return this.firstNumber * this.secondNumber
//       case CalculatorOperations.divide : 
//       if(this.secondNumber === 0){
//         this.calcValue.set('Помилка')
//         return this.calcValue()
//       }
//       return this.firstNumber / this.secondNumber
//     }
//     return ''
//   }
  
//   // public getCheckingTheResult (value : StringOrNumber) :  StringOrNumber{   
//   //   if(typeof(value) === 'string') return value
//   //   else return value.toString().replace(/(\.\d*?[1-9])?0+$/, '$1')
//   // }

//   public compute () : void {
//     let result = this.findingTheResultOfTheCalculation()
//     // if (/\./.test(result.toString())) {
//     //   this.getCheckingTheResult(result)
//     //   result = Number(result)
//     // }
//     this.calcValue.set(result.toString())
//     if(result !== 'Помилка') {
//       this.historyOfComputing.push({
//         firstNumber: this.firstNumber,
//         secondNumber: this.secondNumber,
//         operation : this.action,
//         resultOfComputing : result
//       })
//     }
//     if (this.historyOfComputing.length > this.MAX_LENGTH_CALC_VALUE) {
//       this.historyOfComputing = this.historyOfComputing.slice(1)
//     }
//     if(typeof result === 'number')this.firstNumber = result
//   }
// }







// ===============================================================================





// export class MyCalculatorComponent {
//   public arrayCalculatorNumbers : string [][] =  [ ['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'] ]

//   // Значення на screen калькулятора
//   public calcValue : string = '0'
//   // Введенні числа
//   public currentCalcValue: string = '';
//   public calcNumber : string = 'noValue' 
//   public endOfDataEntry : boolean = false
//   public firstNumber : number = 0
//   public secondNumber : number = 0
//   public action : string = ''
//   public DIVISOR : number = 100
//   public historyOfComputing : CalculatorGroup [] = []
//   private eventTarget? : HTMLElement
//   counter : WritableSignal<string> = signal('0')

//   computedCounter = computed(() => this.counter())
//   constructor(){
//     effect(() => {
//       this.computedCounter()
//       if(this.computedCounter().length > 3){
//         console.log(this.computedCounter());
//         let res = this.computedCounter().replace(/(\d{4}\B)/g, '$& ')
//         console.log(res);
        
//       }
//       console.log(this.computedCounter());
      
      
//     });
//   }

//   public editTheInputField(event : Event){

//   }
  

//   public onClickValue(event : Event) : void{
//     this.eventTarget = event.target as HTMLElement
//     let targetElement = this.eventTarget.innerText

//     if(targetElement === 'AC') this.clearAttributeCalculator()

//     if(this.eventTarget.closest('.plus-minus')){
//       let number
//       if(this.calcValue !== '0'){
//         number = parseFloat(this.calcValue)
//         number = -number
//         this.assigningDifferentValueToVariables(number)
//       }
//     }   

//     if(targetElement === '%'){
//       if(this.firstNumber === 0) return
//       let rate = this.secondNumber === 0 ? 1 : this.secondNumber
//       if(this.firstNumber !== 0 && this.action === '') {
//         this.firstNumber = this.firstNumber * rate / this.DIVISOR
//         this.calcValue = this.firstNumber.toString()
//       }
//       else if (this.firstNumber !== 0 && this.secondNumber !== 0){
//         this.secondNumber = this.findingTheResultOfPercentageOfNumber(rate)
//         this.calcValue = this.secondNumber.toString()
//       }
//     }

//     if(this.eventTarget.getAttribute('data-type') === 'number'){
//       if(targetElement === '0' && this.calcValue === '0') return
//       if(targetElement === '.' && this.calcValue.includes('.')) return
//       this.onNumberClick(targetElement)
//     }

//     if(this.eventTarget.getAttribute('data-type') === 'actions'){      
//       if(this.action !== '' && this.calcValue.toString() !== this.firstNumber.toString()){
//         this.compute()
//         if(this.firstNumber !== 0 && this.secondNumber !== 0){        
//           this.secondNumber = 0
//           this.calcNumber = 'noValue'
//           this.action = targetElement
//           return
//         } 
//       }  
//       this.action = targetElement
//       this.calcNumber = 'noValue'
//       return
//     }

//     if(targetElement === '=' && this.action !== '') this.compute()
//   }

//   public clearAttributeCalculator () : void{
//     this.firstNumber = 0
//     this.secondNumber = 0
//     this.calcValue = '0'
//     this.calcNumber = 'noValue'
//     this.action = ''
//   }
  
//   public findingTheResultOfPercentageOfNumber (rate : number) : number | any {
//     switch (this.action) {
//       case CalculatorOperations.plus:
//       case CalculatorOperations.minus:
//           return this.firstNumber * rate / this.DIVISOR;
//       case CalculatorOperations.multiply:
//       case CalculatorOperations.divide:
//         return  rate / this.DIVISOR;
//     }
//   }
//   public assigningDifferentValueToVariables (number : number) : void {
//     if(this.calcValue.toString() === this.firstNumber.toString()){
//       this.calcValue = number.toString()
//       this.firstNumber = number
//     }
//     else if(this.calcValue.toString() === this.secondNumber.toString()){
//       this.calcValue = number.toString()
//       this.secondNumber = number
//     }
//   }

//   public onNumberClick(value : string) : void{
//     if(value === '.' && this.calcValue ==='0') {
//       this.calcNumber = this.calcValue += value
//       return
//     }

//     if(this.calcNumber === Math.abs(this.secondNumber).toString()  && this.calcValue.toString() === this.firstNumber.toString()) 
//       this.clearAttributeCalculator()
    
//     if(this.calcNumber !== 'noValue') this.calcNumber = this.calcNumber + value
//     else this.calcNumber = value

//     this.calcValue = this.calcNumber

//     if(this.secondNumber === 0 && this.action === '') this.firstNumber = parseFloat(this.calcValue)
//     else this.secondNumber = parseFloat(this.calcValue)
//   }

//   public compute () : void {
//     let result = this.findingTheResult()
//     this.calcValue = result;
//     this.historyOfComputing.push({
//       firstNumber: this.firstNumber,
//       secondNumber: this.secondNumber,
//       operation : this.action,
//       resultOfComputing : result
//     })

//     this.firstNumber = result
//     // this.endOfDataEntry = true
//   }

//   public findingTheResult() : number | any{    
//     if(this.calcNumber === 'noValue') {
//       this.secondNumber = this.firstNumber
//       this.calcNumber = this.secondNumber.toString() 
//     }
//     switch(this.action){
//       case CalculatorOperations.plus : return this.firstNumber + this.secondNumber
//       case CalculatorOperations.minus : return this.firstNumber - this.secondNumber
//       case CalculatorOperations.multiply : return this.firstNumber * this.secondNumber
//       case CalculatorOperations.divide : 
//       if(this.secondNumber === 0){
//         this.calcValue = 'Помилка'
//         return this.calcValue
//       }
//       return this.firstNumber / this.secondNumber
//     }
//   }
// }







  // private findPercentageOfNumber() : string{
  //   let rate = this.secondNumber === '0' ? 1 : Number(this.secondNumber)
  //   let result = 0
  //   let formattedResult : string = ''
  //   const DIVISOR : number = 100
  //   if (this.firstNumber !== '0' && this.action === '') {
  //     result = Number(this.firstNumber) * rate / DIVISOR   
  //     this.firstNumber = result.toString()
  //   } else if (this.firstNumber !== '0' && this.secondNumber !== '0' || this.secondNumber === '0') {
  //     if(this.secondNumber === this.firstNumber ) rate = Number(this.firstNumber)

  //     switch (this.action) {
  //       case MathActions.plus:
  //       case MathActions.minus:
  //         result = Number(this.firstNumber) * rate / DIVISOR
  //         break
  //       case MathActions.multiply:
  //       case MathActions.divide: 
  //         result = rate / DIVISOR
  //         break
  //     }
  //     this.secondNumber = result.toString()
  //   }

  //   if(Number(result) > this.maxAllowedNumber || this.checkNumberLength(result.toString())) {
  //     formattedResult = this.convertToExponentialFormat(result)
  //   }else{
  //     formattedResult = result.toString()
  //   }
    
  //   return formattedResult.toString()
  // }