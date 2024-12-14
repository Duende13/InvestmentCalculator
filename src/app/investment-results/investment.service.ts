import { Injectable, signal } from '@angular/core';
import { Investment } from '../investment.model';
import { Result } from './result.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  investmentResults = signal<Result[] | undefined>(undefined);
  
  onCalculateInvestmentResults(investement : Investment) {
    const {initialInvestment, duration, expectedReturn, annualInvestment } = investement;
    const annualData = [];
    let investmentValue = initialInvestment;
  
    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    console.log(annualData);
    this.investmentResults.set(annualData);
    return annualData;
  }
  
}
