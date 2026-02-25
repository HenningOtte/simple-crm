import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  userId: any = '';

  ngOnInit(): void {
    this.getUserID();
  }

  getUserID() {
    this.activatedRoute.paramMap.subscribe((paraMap) => {
      this.userId = paraMap.get('id');
    });
  }
}
