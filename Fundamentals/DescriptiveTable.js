/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import Button from '../../components/bootstrap/Button';
import Spinner from '../../components/bootstrap/Spinner';
import Icon from '../../components/icon/Icon';
import axios from '../../axios_client1';
import AuthContext from '../../contexts/authContext';
import PatentTable from './PatentTable';
import LicenseTable from './LicenseTable';
import ManagementTable from './ManagementTable';
import PartnershipTable from './PartnershipTable';



const DescriptiveTable = (props) => {

	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						color='primary'
						icon='ArrowBack'
						onClick={() => {
							props.setOpentrial(false);
						}}>
						Back to List
					</Button>
					<SubheaderSeparator />
					<span className='fw-bold'>Tables</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Icon icon='Science' className='me-2' size='2x' />
				</SubHeaderRight>
			</SubHeader>

			<Page container='fluid'>
				<PatentTable />
				<LicenseTable />
				<ManagementTable />
				<PartnershipTable />
			</Page>
		</PageWrapper>
	);
};

export default DescriptiveTable;
