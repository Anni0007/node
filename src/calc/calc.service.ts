import { Injectable } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto, res: any) {
    let expressionArray = calcBody.expression.split(/([+\-*/])/).filter(a => a.trim() !== '')
      
  // Here we are checking if expression is correct or not
  // but currently we are not handling the case of brackets in expression
    if(expressionArray.length%2 == 0){
      return res.status(400).send({
        "statusCode": 400,
        "message": "Invalid expression provided",
        "error": "Bad Request"
      })
    }

    let normalizedArray = this.getNormalExpression(expressionArray)   

    let result = parseFloat(normalizedArray[0]);

    for (let i = 1; i < normalizedArray.length; i += 2) {
        const mathOperator = normalizedArray[i];
        const nextNumber = parseFloat(normalizedArray[i + 1]);

        if (mathOperator === '+') {
            result += nextNumber;
        } else if (mathOperator === '-') {
            result -= nextNumber;
        }
    }
    
    return res.status(201).send({result:result})
  }

  getNormalExpression(expression){
    let a = expression 

    let b = expression

    for(let i = 0; i <a.length; i++){
      if(a[i] === '/'){
        let res = a[i-1]  / a[i+1] 
        b.splice(i - 1, 3, res.toString()); 
        i -= 2;
      }
    }

    for(let i = 0; i< a.length; i++){
      if(a[i] === '*'){
        let res = a[i-1] * a[i+1] 
        b.splice(i - 1, 3, res.toString()); 
        i -= 2;
      }
    }
    return b
  }
}
