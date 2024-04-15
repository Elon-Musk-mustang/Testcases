import { Component,OnInit } from '@angular/core';
  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
  
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
// export class IndexComponent {
  
//   posts: Post[] = [];
      

//   constructor(public postService: PostService) { }
      
 
//   ngOnInit(): void {
//     this.postService.getAll().subscribe((data: Post[])=>{
//       this.posts = data;
//       console.log(this.posts);
//     })  
//   }
      

//   deletePost(id:number){
//     this.postService.delete(id).subscribe(res => {
//          this.posts = this.posts.filter(item => item.id !== id);
//          console.log('Post deleted successfully!');
//     })
//   }
  
// }
export class IndexComponent implements OnInit {
  posts: Post[] = [];

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postService.getAll().subscribe((data: Post[]) => {
      if (data) {
        this.posts = data;
      } else {
        console.error('Error: No data returned from getAll() method');
      }
    }, error => {
      console.error('Error occurred while fetching posts:', error);
    });
  }

  deletePost(id: number): void {
    this.postService.delete(id).subscribe(() => {
      this.posts = this.posts.filter(item => item.id !== id);
    }, error => {
      console.error('Error occurred while deleting post:', error);
    });
  }
}