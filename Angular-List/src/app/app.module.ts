import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListFactoryComponent } from './list-factory/list-factory.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		ListFactoryComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
