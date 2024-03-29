import { Injectable } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto, res: any) {
    let expressionArray = calcBody.expression.split('') 
   
    // Here we are checking if expression is correct or not
    // but currently we are not handling the case of brackets in expression
    if(expressionArray.length%2 == 0){
      return res.status(400).send({
        "statusCode": 400,
        "message": "Invalid expression provided",
        "error": "Bad Request"
      })
    }

    let result = parseFloat(expressionArray[0]);

    // iterating a array by skiping a math operator currently not handling a precendence case
    for (let i = 1; i < expressionArray.length; i += 2) {
        const mathOperator = expressionArray[i];
        const nextNumber = parseFloat(expressionArray[i + 1]);

        if (mathOperator === '+') {
            result += nextNumber;
        } else if (mathOperator === '-') {
            result -= nextNumber;
        } else if (mathOperator === '*') {
            result *= nextNumber;
        } else if (mathOperator === '/') {
            result /= nextNumber;
        }
    }

    console.log("result", result);
    
    return res.status(201).send({result:result})
  }
}
