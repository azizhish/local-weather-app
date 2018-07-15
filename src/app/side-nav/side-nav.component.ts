import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { Component } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.css"]
})
export class SideNavComponent {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );
  constructor(private breakpointObserver: BreakpointObserver) {}
}
