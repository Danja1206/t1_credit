export interface IPayment {
  interest: number;
  paid: boolean;
  paymentAmount: number;
  paymentDate: Date;
  paymentId: number;
  principal: number;
  remainingBalance: number;
  [key: string]: number | Date | boolean;
}

export interface ILoan {
  amount: number;
  interestRate: number;
  monthlyPayment: number;
  payment: {
    paymentDetails: IPayment[];
  };

  termInMonth: number;
}
