
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  

  constructor( 
    private notificationService: NotificationService

  ) { }
}


