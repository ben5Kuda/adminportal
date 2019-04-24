import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './oauth/authConfig';

import {InputTextModule} from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  options = ['Home', 'View-Fixtures', 'Add-Fixtures', 'Tickets', 'Users', 'Orders'];
  opt: any;
  title = 'Admin Console';
  dashboard = 'Logout';

  visibleSidebar1;

  constructor(private oauthService: OAuthService, private router: Router) {
    this.configureWithNewConfigApi();
  }

  ngOnInit() {
  }

  public login() {
    this.oauthService.initImplicitFlow();
}

  public logoff() {
    this.oauthService.logOut();
}

public get name() {

    const claims = this.oauthService.getIdentityClaims();
    if (!claims) { return null; }
    return claims;
}

  onSelect(opt: string): void {
    this.opt = opt.toLowerCase();
    if (this.opt === 'home') {
      this.router.navigate(['']);
    } else {
      this.router.navigate([this.opt]);
    }

  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

}
