import { Component, signal, effect, WritableSignal  } from '@angular/core'
import { CommonModule } from "@angular/common"
import { FormsModule } from '@angular/forms'

enum MathActions {
  plus = '+',
  minus = '-',
  multiply = 'x',
  divide = '\u00F7',
  equal = '='
}
interface CalculatorGroup {
  firstNumber : string,
  secondNumber : string,
  operation : string,
  resultOfComputing : number | string
}

type StringOrNumber = string | number

@Component({
  standalone: true,
  selector: 'app-my-calculator',
  templateUrl: './my-calculator.component.html',
  styleUrl: './my-calculator.component.scss',
  imports: [FormsModule,CommonModule],
  providers: []
})

export class MyCalculatorComponent {
  public arrayCalculatorNumbers : string [][] =  [ ['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'] ]
  public calcValue : WritableSignal<string> = signal('0')
  public calcNumber : string = 'noValue' 
  public firstNumber : string = '0'
  public secondNumber : string = '0'
  private action : string = ''
  private maxAllowedNumber = 999999999
  private maxLengthNumber = 9
  public historyOfComputing : CalculatorGroup [] = []
  isDisabled : WritableSignal<boolean> = signal(false) 
  public isError : WritableSignal<boolean> = signal(false) 
  public calcError : WritableSignal<string> = signal('Помилка')
  private endOfDataEntry : boolean = false
  public mathActions:  { method: (action: MathActions) => void, value: MathActions }[] = [
    { method: (action) => this.onClickMathActions(action), value: MathActions.divide },
    { method: (action) => this.onClickMathActions(action), value: MathActions.multiply },
    { method: (action) => this.onClickMathActions(action), value: MathActions.minus },
    { method: (action) => this.onClickMathActions(action), value: MathActions.plus },
    { method: (action) => this.equal(action), value: MathActions.equal }
  ]
  public isButtonDisabled(value: string): boolean {
    return value === '.' ? this.calcValue().includes('.') : false
  }
  public isFirstNumberIsZero = (): boolean => {
    const calcValue = this.calcValue()
    return calcValue ? calcValue.startsWith('0') : false
  }
  constructor(){
    effect(() => {
      const calcValue = this.calcValue()
      let regular = this.formatNumberWithThousandsSeparator(calcValue)
      
      this.calcValue.set(regular)      
      if (this.checkNumberLength(calcValue)) this.isDisabled.set(true)
    }, {allowSignalWrites: true});
  }

  private formatNumberWithThousandsSeparator(number : string) {
    let parts = number.split('.')
    let formattedIntegerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    let formattedDecimalPart = parts.length > 1 ? `.${parts[1]}` : ''
    return formattedIntegerPart + formattedDecimalPart
  }

  private checkNumberLength(numberString : string) {
    return numberString.replace(/[^\d]/g, "").length >= this.maxLengthNumber
  }

  public onClickNumber(value : string) : void{
    if(value === '.' && this.calcValue() === '0' || this.isError() && value === '.'){ 
      this.handleSpecialCondition(value)
      return
    } 
    
    if(this.isEqualFields() || this.isError()){
      this.clearAttributeCalculator()
      if(value === '.'){
        this.calcValue.set('0')
        this.handleSpecialCondition(value)
        return
      }
    } 

    if(this.calcNumber !== 'noValue') this.calcNumber = this.calcNumber + value
    else this.calcNumber = value

    this.calcValue.set(this.calcNumber)
    this.isFirstNumberOrTheSecond()
  }

  private handleSpecialCondition(value : string) : void {
    if(this.isError()) this.isError.set(false)

    this.calcValue.update(val => val + value)
    this.calcNumber = this.calcValue()
  }

  private isEqualFields() : boolean {
    return this.calcNumber === this.secondNumber && this.calcValue().split(' ').join('') === this.firstNumber
  }

  public clearAttributeCalculator () : void{
    this.firstNumber = '0'
    this.secondNumber = '0'
    this.calcValue.set('0')
    this.calcNumber = 'noValue'
    this.action = ''
    this.isDisabled.set(false)
    this.isError.set(false)
  }

  private isFirstNumberOrTheSecond() : void{    
    if(this.secondNumber === '0' && this.action === '') this.firstNumber = this.calcValue()
    else this.secondNumber = this.calcValue()
  }

  onClickMathActions(action : string) : void {
    this.isDisabled.set(false) 

    if (this.firstNumber.endsWith('.') || this.secondNumber.endsWith('.') || this.calcValue().endsWith('.')) this.hasDecimalEnding()

    if(this.action !== '' && !this.endOfDataEntry && this.calcNumber !== 'noValue') this.compute()
    else if(this.action !== '' && Math.abs(Number(this.firstNumber)) === Math.abs(Number(this.secondNumber))) this.compute()

    this.action = action
    this.endOfDataEntry = false
    this.calcNumber = 'noValue'
  }

  private hasDecimalEnding() : void {
    let result : string = ''
    switch(this.firstNumber.endsWith('.') || this.secondNumber.endsWith('.')) {
      case this.firstNumber.endsWith('.') :
        result += this.firstNumber = this.firstNumber.replace(/\D/g, '');
        break
      case this.secondNumber.endsWith('.') :
        result += this.secondNumber = this.secondNumber.replace(/\D/g, '');
        break
    }
    this.calcValue.set(result)
  }
  public equal(action : string) : void{
    if (this.firstNumber.endsWith('.') || this.secondNumber.endsWith('.')) this.hasDecimalEnding()
    if(this.action !== ''){
      this.isDisabled.set(false)
      this.compute()
      this.endOfDataEntry = true
    }
  }

  private compute() {
    let calculationResult = this.findingTheResultOfTheCalculation()
    
    if (typeof calculationResult !== 'number') {
      this.isError.set(true)
      return
    } else calculationResult = this.getCheckingTheResult(calculationResult)

    if (calculationResult > this.maxAllowedNumber) calculationResult = this.convertToExponentialFormat(calculationResult)

    const resultString = calculationResult.toString()
    this.displayCalculationHistory(resultString)
    this.calcValue.set(resultString)
    this.firstNumber = resultString
  }

  private findingTheResultOfTheCalculation() : StringOrNumber{   
    if(this.secondNumber === '0' && this.calcNumber === 'noValue') this.calcNumber = this.secondNumber += this.firstNumber
    let result : number = 0
    switch(this.action){
      case MathActions.plus : result = Number(this.firstNumber) + Number(this.secondNumber)
        break
      case MathActions.minus : result = Number(this.firstNumber) - Number(this.secondNumber)
        break
      case MathActions.multiply : result = Number(this.firstNumber) * Number(this.secondNumber)
        break
      case MathActions.divide : 
        if(this.secondNumber === '0'){
          return 'Помилка' 
        }
        result = Number(this.firstNumber) / Number(this.secondNumber)
          break
    } 
    return result
  }

  private getCheckingTheResult (value : number) :  number{ 

    let resultString = value.toString()

    if (Math.abs(value) > this.maxAllowedNumber) {
      resultString = this.convertToExponentialFormat(value)
    }

    const decimalIndex = resultString.indexOf('.')
    let maxLength = this.maxLengthNumber
    if (decimalIndex !== -1) {
      maxLength += 1
    }
    if (resultString.length > maxLength) {
      resultString = resultString.slice(0, maxLength)
    }

    return Number(resultString)
  }

  private convertToExponentialFormat(result : number){
    let toPrecisionNumber  = parseFloat(result.toPrecision(7))
    let formattedResult = toPrecisionNumber.toExponential().toString()
    return formattedResult.replace('+', '')
  }

  private displayCalculationHistory(value : string){
    const MAX_LENGTH_CALC_VALUE : number = 3
    this.historyOfComputing.push({
      firstNumber: this.formatNumberWithThousandsSeparator(this.firstNumber),
      secondNumber: this.formatNumberWithThousandsSeparator(this.secondNumber),
      operation : this.action,
      resultOfComputing : this.formatNumberWithThousandsSeparator(value)
    })
    if (this.historyOfComputing.length > MAX_LENGTH_CALC_VALUE) this.historyOfComputing = this.historyOfComputing.slice(1)
  }

  public handleButtonClick(valueType: string): void {    
    if (!this.isDisabled()){
      if(valueType === '.') this.onClickNumber('.')
      else this.onClickNumber(valueType)
    }
  }

  public handleMathActionClick(mathAction: { method: (action: MathActions) => void, value: MathActions }): void {
    mathAction.method(mathAction.value);
  }

  public onClickOperation(operationType: string) {
    if (this.calcValue() !== '0') {
      switch (operationType) {
        case 'switchNumberSign': this.switchNumberSign()
            break
        case 'onClickPercentage': this.onClickPercentage()
            break
        default:
            break
      }
    } else !this.isDisabled()
  }


  public switchNumberSign () : void {
    this.isDisabled.set(false)

    let targetNumber: string
    let currentNumber = this.calcValue().split(' ').join('')
    let numberToSwitch = -parseFloat(currentNumber)

    if (this.firstNumber === currentNumber) {
        this.firstNumber = numberToSwitch.toString()
        targetNumber = this.firstNumber
    } else {
        this.secondNumber = numberToSwitch.toString()
        targetNumber = this.secondNumber
    }

    this.calcValue.set(targetNumber)
    this.calcNumber = this.secondNumber
  }

  public onClickPercentage () : void {
    this.isDisabled.set(true)   
    if(this.isEqualFields() && this.firstNumber !== this.secondNumber){
      this.action = ''
      this.secondNumber = '0'
      this.calcNumber = 'noValue'
    }
    this.calcValue.set(this.findPercentageOfNumber())
    
    this.calcNumber = this.calcValue()
  }

  private findPercentageOfNumber(): string {
    let rate = this.calculateRate()
    let result = this.calculateResult(rate)
    let formattedResult = this.formatResult(result)

    return formattedResult
  }

  private calculateRate(): number {
    return this.secondNumber === '0' ? 1 : Number(this.secondNumber);
  }

  private calculateResult(rate: number): number {
    let result = 0
    const DIVISOR : number = 100
    if (this.firstNumber !== '0' && this.action === '') {
        result = Number(this.firstNumber) * rate / DIVISOR
        this.firstNumber = result.toString()
    } else if (this.firstNumber !== '0' && (this.secondNumber !== '0' || this.secondNumber === '0')) {
        if (this.secondNumber === this.firstNumber) rate = Number(this.firstNumber)
        switch (this.action) {
            case MathActions.plus:
            case MathActions.minus:
              result = Number(this.firstNumber) * rate / DIVISOR
              break
            case MathActions.multiply:
            case MathActions.divide:
              result = rate / DIVISOR
              break
        }
        this.secondNumber = result.toString()
    }
    return result
  }

  private formatResult(result: number): string {
    if (result > this.maxAllowedNumber || this.checkNumberLength(result.toString())) return this.convertToExponentialFormat(result)
    else return result.toString()
  }
}