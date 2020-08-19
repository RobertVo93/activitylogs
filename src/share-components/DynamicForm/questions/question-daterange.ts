import { QuestionBase } from './question-base';
import { FormConfig } from '../form.config';
import { ODateRange } from '../../Variables/DateRange';

export class DateRangeQuestion extends QuestionBase<ODateRange> {
  controlType = '';

  constructor(options: any) {
    super(options);
    this.controlType = new FormConfig().questionControlType.dateRange;
  }
}
