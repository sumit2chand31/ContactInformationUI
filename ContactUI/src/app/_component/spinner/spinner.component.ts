import { Component } from '@angular/core';
import { LoderService } from '../../../_services/loder.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  constructor(public loader: LoderService) { }

}
