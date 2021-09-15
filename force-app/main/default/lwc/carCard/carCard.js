import { LightningElement, wire } from 'lwc';


//Car__c Schema

import NAME_FIELD from '@salesforce/schema/Car__c.Name'
import PICTURE_URL_FIELD from '@salesforce/schema/Car__c.Picture_URL__c'
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__C'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__C'
import MSRP_FIELD from '@salesforce/schema/Car__c.MSRP__c'
import FUEL_FIELD from '@salesforce/schema/Car__c.Fuel_Type__c'
import SEATS_FIELD from '@salesforce/schema/Car__c.Number_of_Seats__c'
import CONTROL_FIELD from '@salesforce/schema/Car__c.Control__c'
//getFieldValue funsion is used to extract field values
import {getFieldValue} from 'lightning/uiRecordApi'

//lightning message service
import {subscribe,MessageContext,unsubscribe} from 'lightning/messageService'
import CAR_SELECTED_MESSAGE from '@salesforce/messageChannel/CarSelected__c'

export default class CarCard extends LightningElement {

    //load content for LMS
    @wire(MessageContext)
    messageContext

    //exposing fields to make the available for the template
    categoryField = CATEGORY_FIELD
    makeField = MAKE_FIELD
    msrpField = MSRP_FIELD
    fuelField = FUEL_FIELD
    seatsField = SEATS_FIELD
    controlField = CONTROL_FIELD
    //id of car to display in card
    recordId 

    //car fields displayed with specefic format
    carName
    carPictureUrl

    //subscription reference for carSelected
    carSelectionSubscription


    handleRecordLoaded(event){
        const {records} = event.detail
        const recordData = records[this.recordId]
        this.carName = getFieldValue(recordData, NAME_FIELD)
        this.carPictureUrl = getFieldValue(recordData, PICTURE_URL_FIELD)
    }

    connectedCallback(){
        this.subscribeHandler()
    }
    subscribeHandler(){
        this.carSelectionSubscription = subscribe(this.messageContext, CAR_SELECTED_MESSAGE,(message)=>this.handleCarSelected(message))
    }

    handleCarSelected(message){
        console.log(message.carId);
        this.recordId=message.carId;
    }

    disconnectedCallback(){
        unsubscribe(this.carSelectionSubscription)
        this.carSelectionSubscription = null
    }
}