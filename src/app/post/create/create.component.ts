import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
  
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
  
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  formSubmitted: EventEmitter<any> = new EventEmitter<any>();

  
  form!: FormGroup;
      
  
  constructor(
    public postService: PostService,
    private router: Router
  ) { }
      
  
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
  }

  goBack() {
    this.router.navigateByUrl('post/index');
  }
      

  get f(){
    return this.form.controls;
  }
      
 
  submit(){
    if (this.form.valid) {
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res:any) => {
         console.log('Post created successfully!');
         this.router.navigateByUrl('post/index');
    })
  }
}
}