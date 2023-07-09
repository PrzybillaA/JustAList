import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListFactoryComponent } from './list-factory/list-factory.component';
import { ListStaticComponent } from './list-static/list-static.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		ListFactoryComponent,
		ListStaticComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
