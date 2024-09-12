import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {

}
