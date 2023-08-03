/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../layout/SubHeader/SubHeader';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Icon from '../../components/icon/Icon';
import classNames from 'classnames';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import DescriptiveTable from './DescriptiveTable';
import axios from '../../axios_client1';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import { useFormik } from 'formik';
import Card, {
	CardBody,
	CardHeader,
	CardActions,
	CardFooter,
	CardFooterRight,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import PaginationButtons from '../../components/PaginationButtons';
import Spinner from '../../components/bootstrap/Spinner';
import Checks from '../../components/bootstrap/forms/Checks';


const dataTable = [{
	"ticker": "A",
	"companyName": "Agilent Technologies Inc.",
	"marketCap": "28.5B",
	"price": "92.5",
	"52WeekRange": "61.13 - 94.49",
	"InCash": "Yes",
	"PatentCoverage": "Yes",
	"Partnership": "Yes",
	"Management": "Yes"
}, {
	"ticker": "AA",
	"companyName": "Alcoa Corp.",
	"marketCap": "5.5B",
	"price": "29.5",
	"52WeekRange": "5.61 - 30.69",
	"InCash": "Yes",
	"PatentCoverage": "Yes",
	"Partnership": "Yes",
	"Management": "Yes"
}, {	
	"ticker": "AACG",
	"companyName": "ATA Creativity Global",
	"marketCap": "12.5M",
	"price": "1.5",
	"52WeekRange": "0.5 - 2.5",
	"InCash": "Yes",
	"PatentCoverage": "Yes",
	"Partnership": "Yes",
	"Management": "Yes"
}, {
	"ticker": "AACQ",
	"companyName": "Artius Acquisition Inc.",
	"marketCap": "1.5B",
	"price": "10.5",
	"52WeekRange": "9.5 - 11.5",
	"InCash": "Yes",
	"PatentCoverage": "Yes",
	"Partnership": "Yes",
	"Management": "Yes"
}, {
	"ticker": "AACQU",
	"companyName": "Artius Acquisition Inc. Units",
	"marketCap": "1.5B",
	"price": "10.5",
	"52WeekRange": "9.5 - 11.5",
	"InCash": "Yes",
	"PatentCoverage": "Yes",
	"Partnership": "Yes",
	"Management": "Yes"
}, {
	"ticker": "AACQW",
	"companyName": "Artius Acquisition Inc. Warrant",
	"marketCap": "1.5B",
	"price": "10.5",
	"52WeekRange": "9.5 - 11.5",
	"InCash": "Yes",
	"PatentCoverage": "Yes",
	"Partnership": "Yes",
	"Management": "Yes"

}];

const hasCatalyst = ['Does not matter', 'Yes', 'No'];
const stockPricing = ['Any', 'New High', 'New Low', '5% or more below High', '10% or more below High', '15% or more below High'];
const patentExpiring = ['Any', 'Within 1 year', 'Within 2 years', 'Within 3 years', 'Within 4 years', 'Within 5 years'];

const Fundamentals = (props) => {
	const [limit, setLimit] = useState(5);
	const [count, setCount] = useState(0);
	const [page, setPage] = useState(1);
	const [waitingspinner, setwaitingspinner] = useState(<></>);
	const [opentrial, setOpentrial] = useState(false);
	const [trials, setTrials] = useState([]);
	const [editeventshow, setediteventshow] = useState(false);

	const caprange = {
		'': { mincap: '', maxcap: '' },
		'<250M': { mincap: 0, maxcap: 250000000 },
		'250M - 2B': { mincap: 250000000, maxcap: 2000000000 },
		'2B - 10B': { mincap: 2000000000, maxcap: 10000000000 },
		'10B - 200B': { mincap: 10000000000, maxcap: 200000000000 },
		'>200B': { mincap: 200000000000, maxcap: '' },
	};

	const hasCatalyst = ['Does not matter', 'Yes', 'No'];
	const patentExpiring = ['Any', 'Within 1 year', 'Within 2 years', 'Within 3 years', 'Within 4 years', 'Within 5 years'];
	const stockPricing = ['Any', 'New High', 'New Low', '5% or more below High', '10% or more below High', '15% or more below High'];

	useEffect(() => {
		fetchdata(0);
		setPage(1);
		formik.resetForm();
	}, []);

	function handlePageClick(page) {
		fetchdata((page - 1) * limit);
	}

	useEffect(() => {
		if (trials.length >0){
			handlePageClick(page);
		}

	}, [page]);


	async function fetchdata(skipval) {
		const url = '/get_fundamentals_status';
		const payload1 = {
			ticker: formik.values.ticker.toUpperCase(),
			runawaycash: formik.values.runawaycash,
			stockprice: formik.values.stockprice,
			matterpatent: formik.values.matterpatent,
			patentexpire: formik.values.patentexpire,
			marketcap: formik.values.marketcap,
			skip: skipval,
			limit,
			marketCapMin: formik.values.marketCapMin,
			marketCapMax: formik.values.marketCapMax,
			managementma: formik.values.managementma,
			managementharvard: formik.values.managementharvard,
			managementownership: formik.values.managementownership,
			keywords: formik.values.keywords,
		};
		const payload2 = {
			ticker: formik.values.ticker.toUpperCase(),
			runawaycash: formik.values.runawaycash,
			stockprice: formik.values.stockprice,
			matterpatent: formik.values.matterpatent,
			patentexpire: formik.values.patentexpire,
			marketcap: formik.values.marketcap,
			skip: skipval,
			limit,
			marketCapMin: formik.values.marketCapMin,
			marketCapMax: formik.values.marketCapMax,
			managementma: formik.values.managementma,
			managementharvard: formik.values.managementharvard,
			managementownership: formik.values.managementownership,
			keywords: formik.values.keywords,
			count: 'T',
		};

		setwaitingspinner(<Spinner />);
		try {
			const request1 = await axios.post(url, payload1);
			const request2 = await axios.post(url, payload2);

			const arr1 = await request1;
			const arr2 = await request2;

			setTrials(arr1.data);
			if (arr2.data.length > 0) {
				setCount(arr2.data[0].total);
			} else {
				setCount(0);
			}
			setwaitingspinner(<></>);
		} catch {
			setwaitingspinner(
				<div className='d-flex align-self-end'>
					<p>Unable to complete the request!</p>
				</div>,
			);
			setTrials([]);
			setCount(0);
		}
	}

	function handleneweventopen() {
		setediteventshow(true);
		setAlert(<></>);
	}

	useEffect(() => {
		handlePageClick(page);
	}, [page]);

	function handlesearch() {
		fetchdata(0);
		setPage(1);
	}

	const formik = useFormik({
		initialValues: {
			"ticker": "",
			"runawaycash": "",
			"stockprice": "",
			"matterpatent": "",
			"patentexpire": "",
			"marketcap": "",
			"marketCapMin": "",
			"marketCapMax": "",
			"managementma": "",
			"managementharvard": "",
			"managementownership": "",
			"keywords": "",
		},
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		onSubmit: handlesearch,
	});

	const MainPage = (
			<PageWrapper title='Fundamentals'>
				<SubHeader>
					<SubHeaderLeft>
						<span className='h4 mb-0 fw-bold'>Fundamentals</span>
					</SubHeaderLeft>
					<SubHeaderRight>
						<Icon icon='Assessment' className='me-2' size='2x' />
						<span className='text-muted'>Explore all company fundamentals.</span>
					</SubHeaderRight>
				</SubHeader>
				<Page container='fluid'>
					<Card>
						<CardHeader>
							<CardLabel>
								<CardTitle>Fundamentals</CardTitle>
							</CardLabel>
							<CardActions>
								<Icon icon='Search' className='me-2' size='2x' />
								<span className='text-muted'>{`${count} Search results`}</span>
							</CardActions>
						</CardHeader>
						<form
							className={classNames('row', 'mx-0 g-4', 'rounded-2')}
							onSubmit={formik.handleSubmit}>
							<CardBody>
								<div className='row g-4' style={{ marginBottom: 20 }}>
									<FormGroup
										className='col-xl-3 col-md-4 col-6'
										label='Ticker/Company Name'>
										<Input
											id='ticker'
											placeholder='Enter the ticker...'
											onChange={(e) => {formik.handleChange(e);}}
											value={formik.values.ticker}
										/>
									</FormGroup>
	
									<FormGroup
										className='col-xl-3 col-md-4 col-6'
										label='Has catalyst within cash runway'>
										<Dropdown>
									<DropdownToggle>
										<Button className='w-100' color='primary'>
											Select
										</Button>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd>
									{hasCatalyst.map((cash) => (
										<DropdownItem key={Math.random()}>
											<div>
												<Checks
													id={cash}
													label={cash}
													name={cash}
													onChange={() => {
														if (
															formik.values.runawaycash === cash
														) {
															formik.setFieldValue(
																'runawaycash',
																'',
															);
														} else {
															formik.setFieldValue(
																'runawaycash',
																cash,
															);
														}
													}}
													checked={
														formik.values.runawaycash === cash
													}
												/>
											</div>
										</DropdownItem>
									))}
									</DropdownMenu>
								</Dropdown>
									</FormGroup>
	
									<FormGroup className='col-xl-3 col-md-4 col-6' label='Stock Price'>
									<Dropdown>
									<DropdownToggle>
										<Button className='w-100' color='primary'>
											Select
										</Button>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd>
									{stockPricing.map((price) => (
										<DropdownItem key={Math.random()}>
											<div>
												<Checks
													id={price}
													label={price}
													name={price}
													onChange={() => {
														if (
															formik.values.stockprice === price
														) {
															formik.setFieldValue(
																'stockprice',
																'',
															);
														} else {
															formik.setFieldValue(
																'stockprice',
																price,
															);
														}
													}}
													checked={
														formik.values.stockprice === price
													}
												/>
											</div>
										</DropdownItem>
									))}
									</DropdownMenu>
								</Dropdown>
									</FormGroup>
	
									<FormGroup
										className='col-xl-3 col-md-4 col-6'
										label='Has Composition of matter patent'>
										<Dropdown>
											<DropdownToggle>
												<Button className='w-100' color='primary'>
													Select
												</Button>
											</DropdownToggle>
											<DropdownMenu isAlignmentEnd>
											{hasCatalyst.map((patent) => (
												<DropdownItem key={Math.random()}>
													<div>
														<Checks
															id={patent}
															label={patent}
															name={patent}
															onChange={() => {
																if (
																	formik.values.mattterpatent === patent
																) {
																	formik.setFieldValue(
																		'matterpatent',
																		'',
																	);
																} else {
																	formik.setFieldValue(
																		'matterpatent',
																		patent,
																	);
																}
															}}
															checked={
																formik.values.matterpatent === patent
															}
														/>
													</div>
												</DropdownItem>
											))}
											</DropdownMenu>
										</Dropdown>
									</FormGroup>
								</div>
	
								<div className='row g-4' style={{ marginBottom: 20 }}>
									<FormGroup
										className='col-xl-3 col-md-4 col-6'
										label='Patent expiring in?'>
										<Dropdown>
											<DropdownToggle>
												<Button className='w-100' color='primary'>
													Select
												</Button>
											</DropdownToggle>
											<DropdownMenu isAlignmentEnd>
											{patentExpiring.map((period) => (
												<DropdownItem key={Math.random()}>
													<div>
														<Checks
															id={period}
															label={period}
															name={period}
															onChange={() => {
																if (
																	formik.values.patentexpire === period
																) {
																	formik.setFieldValue(
																		'patentexpire',
																		'',
																	);
																} else {
																	formik.setFieldValue(
																		'patentexpire',
																		period,
																	);
																}
															}}
															checked={
																formik.values.patentexpire === period
															}
														/>
													</div>
												</DropdownItem>
											))}
											</DropdownMenu>
										</Dropdown>
									</FormGroup>
									<FormGroup className='col-lg-3 col-6' label='Market Cap Range'>
									<Dropdown>
										<DropdownToggle>
											<Button className='w-100' color='primary'>
												Market Cap
											</Button>
										</DropdownToggle>
										<DropdownMenu isAlignmentEnd>
											{Object.keys(caprange).map((cap) => (
												<DropdownItem key={Math.random()}>
													<div>
														<Checks
															id={cap}
															label={cap}
															name={cap}
															onChange={() => {
																if (
																	formik.values.marketcap === cap
																) {
																	formik.setFieldValue(
																		'marketcap',
																		'',
																	);
																} else {
																	formik.setFieldValue(
																		'marketcap',
																		cap,
																	);
																}
															}}
															checked={
																formik.values.marketcap === cap
															}
														/>
													</div>
												</DropdownItem>
											))}
										</DropdownMenu>
									</Dropdown>
								</FormGroup>
	
									<FormGroup
										className='col-xl-3 col-md-4 col-6'
										label='Market Cap Min'>
										<Input
											id='marketCapMin'
											placeholder='Enter the amount'
											onChange={(event) => {formik.handleChange(event);}}
											value={formik.values.marketCapMin}
										/>
									</FormGroup>
	
									<FormGroup
										className='col-xl-3 col-md-4 col-6'
										label='Market Cap Max'>
										<Input
											id='marketCapMax'
											placeholder='Enter the amount'
											onChange={(event) => {formik.handleChange(event)}}
											value={formik.values.marketCapMax}
										/>
									</FormGroup>
								</div>
	
								<div className='row g-4' style={{ marginBottom: 50 }}>
									<FormGroup
										className='col-xl-3 col-md-4 col-6'
										label='Management with M&A experience'>
										<Dropdown>
									<DropdownToggle>
										<Button className='w-100' color='primary'>
											Select
										</Button>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd>
									{hasCatalyst.map((ma) => (
										<DropdownItem key={Math.random()}>
											<div>
												<Checks
													id={ma}
													label={ma}
													name={ma}
													onChange={() => {
														if (
															formik.values.managementma === ma
														) {
															formik.setFieldValue(
																'managementma',
																'',
															);
														} else {
															formik.setFieldValue(
																'managementma',
																ma,
															);
														}
													}}
													checked={
														formik.values.managementma === ma
													}
												/>
											</div>
										</DropdownItem>
									))}
									</DropdownMenu>
								</Dropdown>
									</FormGroup>
	
									<FormGroup
										className='col-xl-3 col-md-4 col-6'
										label='Management from degree with Harvard'>
										<Dropdown>
									<DropdownToggle>
										<Button className='w-100' color='primary'>
											Select
										</Button>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd>
									{hasCatalyst.map((harvard) => (
										<DropdownItem key={Math.random()}>
											<div>
												<Checks
													id={harvard}
													label={harvard}
													name={harvard}
													onChange={() => {
														if (
															formik.values.managementharvard === harvard
														) {
															formik.setFieldValue(
																'managementharvard',
																'',
															);
														} else {
															formik.setFieldValue(
																'managementharvard',
																harvard,
															);
														}
													}}
													checked={
														formik.values.managementharvard === harvard
													}
												/>
											</div>
										</DropdownItem>
									))}
									</DropdownMenu>
								</Dropdown>
									</FormGroup>
	
									<FormGroup
										className='col-xl-3 col-md-4 col-6'
										label='Management with substantial ownership'>
										<Dropdown>
									<DropdownToggle>
										<Button className='w-100' color='primary'>
											Select
										</Button>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd>
									{hasCatalyst.map((ownership) => (
										<DropdownItem key={Math.random()}>
											<div>
												<Checks
													id={ownership}
													label={ownership}
													name={ownership}
													onChange={() => {
														if (
															formik.values.managementownership === ownership
														) {
															formik.setFieldValue(
																'managementownership',
																'',
															);
														} else {
															formik.setFieldValue(
																'managementownership',
																ownership,
															);
														}
													}}
													checked={
														formik.values.managementownership === ownership
													}
												/>
											</div>
										</DropdownItem>
									))}
									</DropdownMenu>
								</Dropdown>
									</FormGroup>
	
									<FormGroup className='col-xl-3 col-md-9 col-6' label='Keywords'>
										<Input
											id='keywords'
											placeholder='Enter the keywords'
											onChange={(event) => {formik.handleChange(event);}}
											value={formik.values.keywords}
										/>
									</FormGroup>
								</div>
	
								<div>
									<Button
										color='primary'
										className='w-15'
										icon='Search'
										aria-label='Search'
										type='submit'>
										Show Results
									</Button>
								</div>
							</CardBody>
						</form>
					</Card>
	
					<div className='insidertable' style={{ fontSize: '11px', marginBottom: 10, marginTop: 10 }}>
						<div className='col-12'>
							<div className='table-responsive-lg text-center'>
								<table className='table table-classic table-hover'>
								<thead className='insiderhead bg-primary'>
										<tr>
											<th colSpan='1'>Ticker</th>
											<th colSpan='1'>Company Name</th>
											<th colSpan='1'>MarketCap</th>
											<th colSpan='1'>Price</th>
											<th colSpan='1'>52WeekRange</th>
											<th colSpan='1'>InCash</th>
											<th colSpan='1'>Patent Coverage</th>
											<th colSpan='1'>Partnership</th>
											<th colSpan='1'>Management</th>
											<th colSpan='1'>GenerateData</th>
										</tr>
									</thead>
									<tbody>
										{trials.map((trial) => (
											<tr key={Math.random()} onClick={() => {setOpentrial(true)}}>
												<td>
												<a href={`/search/${trial?.ticker}`}>
												{trial?.ticker}
											</a>
												</td>
												<td>{trial?.compname}</td>
												<td>{trial?.marketcap}</td>
												<td>{trial?.price}</td>
												<td>{trial?.fifty_two_week_range}</td>
												<td>{trial?.within_cash_runway}</td>
												<td >{trial?.patent}</td>
												<td>{trial?.partnership}</td>
												<td>{trial?.management}</td>
												<td>button</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
	
					<Card>
						<PaginationButtons
							setPerPage={setLimit}
							data={{ length: count }}
							setCurrentPage={setPage}
							currentPage={page}
							perPage={limit}
						/>
					</Card>
				</Page>
			</PageWrapper>
	);
	

	const TrialPage = (
		<DescriptiveTable 
		opentrial={opentrial}
			setOpentrial={setOpentrial}
			/>
	);
	return <>{opentrial ? TrialPage : MainPage}</>;
};

export default Fundamentals;
