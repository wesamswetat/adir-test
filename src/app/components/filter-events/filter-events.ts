import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
    selector: 'filter-events-by',
    templateUrl: './filter-events.html',
    styleUrls: ['./filter-events.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterEventsByComponent implements OnInit, OnDestroy {
    filterBy: string = '';
    filterValueFormControlSub: Subscription;
    filterValueFormControl: FormControl = new FormControl('');
    @Output() filterValue: EventEmitter<string[]> = new EventEmitter<string[]>();

    ngOnInit(): void {
        this.filterValueFormControlSub = this.filterValueFormControl.valueChanges.subscribe((newValue) => {
            this.filterValue.emit([this.filterBy, newValue || '']);
        })
    }

    selectedFilterBy() {
        this.filterValueFormControl.reset();
    }

    ngOnDestroy(): void {
        this.filterValueFormControlSub.unsubscribe();
    }
}