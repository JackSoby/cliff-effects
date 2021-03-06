// REACT COMPONENTS
import React from 'react';
import {
  Table
} from 'semantic-ui-react';

// CUSTOM COMPONENTS
// Both the table and graph should just be added to a results page, but
// this will do for now

// BENEFIT LOGIC
import { getSNAPBenefits } from '../programs/federal/snap';
import { getHousingBenefit } from '../programs/state/massachusetts/housing';


const getSignSymbol = function ( num ) {
  if ( num > 0 ) { return '+'; }
  else if ( num < 0 ) { return '-'; }
  else { return ''; }
};  // End getSignSymbol()


const BenefitsTable = function ( props ) {

  var client        = props.client,
      currentClient = { ...client };
  currentClient.futureEarnedIncomeMonthly = currentClient.currentEarnedIncomeMonthly;

  var SNAPBenefitCurrent  = Math.round( getSNAPBenefits( currentClient ).benefitValue * 12 ),
      SNAPBenefitFuture   = Math.round( getSNAPBenefits( client ).benefitValue * 12 ),
      SNAPDiff            = SNAPBenefitFuture - SNAPBenefitCurrent,
      sec8BenefitCurrent  = Math.round( getHousingBenefit( currentClient ).benefitValue * 12 ),
      sec8BenefitFuture   = Math.round( getHousingBenefit( client ).benefitValue * 12 ),
      sec8Diff            = sec8BenefitFuture - sec8BenefitCurrent,
      totalBenefitCurrent = SNAPBenefitCurrent + sec8BenefitCurrent,
      totalBenefitFuture  = SNAPBenefitFuture + sec8BenefitFuture,
      totalDiff           = SNAPDiff + sec8Diff,
      incomeCurrent       = Math.round( client.currentEarnedIncomeMonthly * 12 ),
      incomeFuture        = Math.round( client.futureEarnedIncomeMonthly * 12 ),
      incomeDiff          = incomeFuture - incomeCurrent,
      netCurrent          = totalBenefitCurrent + incomeCurrent,
      netFuture           = totalBenefitFuture + incomeFuture,
      netDiff             = totalDiff + incomeDiff;

console.log(SNAPDiff);



const   columnHeaderStyle = {
                            background: 'rgba(0, 181, 173, 1)',
                            color: 'white',
                            fontSize: '1.3em',
                            fontWeight: 900,
                            textAlign: 'center',
                            borderRadius: 'inherit',
                            letterSpacing: '0.02em',
                            }
      , totalsRowStyle    = {
                            borderTop: "2px solid rgba(0, 181, 173, 1)",
                            fontWeight: 700,
                            fontSize: '1.1em',
                            padingTop: '0.25em'
                              }
      , rowHeaderStyle    = {
                    fontSize: '1.1em',
                    fontWeight: 700,
                    textAlign: 'left'
                    }
      , totalsRowHeaderStyle = {
                    fontSize: '1.2em',
                    fontWeight: 700,
                    textAlign: 'left',
                    borderTop: "2px solid rgba(0, 181, 173, 1)",
                    padingTop: '0.25em'


      };



  return (
    <wrapper>
      <Table celled>
       <Table.Header>
          <Table.Row >
            <Table.Cell style={columnHeaderStyle} width={3}>Benefit</Table.Cell>
            <Table.Cell style={columnHeaderStyle} width={3}>Current Benefits</Table.Cell>
            <Table.Cell style={columnHeaderStyle} width={3}>New Estimate</Table.Cell>
            <Table.Cell style={columnHeaderStyle} width={3}>Difference</Table.Cell>
          </Table.Row>
      </Table.Header>
        <Table.Body>
            <Table.Row>
              <Table.Cell style={rowHeaderStyle}>SNAP</Table.Cell>
              <Table.Cell textAlign='right'>${SNAPBenefitCurrent} / year</Table.Cell>
              <Table.Cell textAlign='right'>${SNAPBenefitFuture} / year</Table.Cell>
              <Table.Cell textAlign='right'>{ getSignSymbol(SNAPDiff) } ${Math.abs(SNAPDiff)} / year</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell style={rowHeaderStyle}>Section 8 Housing</Table.Cell>
              <Table.Cell textAlign='right'>${sec8BenefitCurrent} / year</Table.Cell>
              <Table.Cell textAlign='right'>${sec8BenefitFuture} / year</Table.Cell>
              <Table.Cell textAlign='right'>{ getSignSymbol(sec8Diff) } ${Math.abs(sec8Diff)} / year</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={3} style={totalsRowHeaderStyle} >Total Benefits</Table.Cell>
              <Table.Cell width={3} style={totalsRowStyle} textAlign='right'>${totalBenefitCurrent} / year</Table.Cell>
              <Table.Cell width={3} style={totalsRowStyle} textAlign='right'>${totalBenefitFuture} / year</Table.Cell>
              <Table.Cell width={3} style={totalsRowStyle} textAlign='right'>{ getSignSymbol(totalDiff) } ${Math.abs(totalDiff)} / year</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell style={rowHeaderStyle}>Income</Table.Cell>
              <Table.Cell textAlign='right'>${incomeCurrent} / year</Table.Cell>
              <Table.Cell textAlign='right'>${incomeFuture} / year</Table.Cell>
              <Table.Cell textAlign='right'>{ getSignSymbol(incomeDiff) } ${Math.abs(incomeDiff)} / year</Table.Cell>
            </Table.Row>
            <Table.Row style={{border: 'none'}}>
              <Table.Cell width={3} style={totalsRowHeaderStyle}>Net Total</Table.Cell>
              <Table.Cell width={3} style={totalsRowStyle} textAlign='right'>${netCurrent} / year</Table.Cell>
              <Table.Cell width={3} style={totalsRowStyle} textAlign='right'>${netFuture} / year</Table.Cell>
              <Table.Cell width={3} style={totalsRowStyle} textAlign='right'>{ getSignSymbol(netDiff) } ${Math.abs(netDiff)} / year</Table.Cell>
            </Table.Row>
        </Table.Body>
      </Table>


    </wrapper>
  )

};  // End BenefitsTable(<>)


export {
	BenefitsTable
};
