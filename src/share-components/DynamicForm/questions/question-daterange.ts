import { QuestionBase } from './question-base';
import { FormConfig } from '../form.config';
import { ODateRange } from '../../../class/common/date-range';

export class DateRangeQuestion extends QuestionBase<ODateRange> {
  controlType = '';

  constructor(options: any) {
    super(options);
    this.controlType = new FormConfig().questionControlType.dateRange;
  }
}
