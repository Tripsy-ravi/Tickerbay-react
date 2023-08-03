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


const ManagementTable = (props) => {
	const [trials, setTrials] = useState([]);
	const { email, credits, setCredits } = useContext(AuthContext);
	const [limit, setLimit] = useState(5);
	const [count, setCount] = useState(0);
	const [page, setPage] = useState(1);
	const [waitingspinner, setwaitingspinner] = useState(<></>);


	

	async function fetchdata(skipVal) {
		const url = '/management_data';
		const payload1 = {
			ticker: "",
			email: 'tripathiravi207@gmail.com',
			skip: skipVal,
			limit: 10
		}
		const payload2 = {
			ticker: "",
			email: 'tripathiravi207@gmail.com',
			limit: 10,
			skip: skipVal,
			count: "F"
		}
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
	useEffect(() => {
		fetchdata(0);

		// phaseList.resetForm();
		// statusList.resetForm();
	}, []);

	return (
		<>
            <text style={{ fontSize: 14, color: 'grey', marginBottom: 10 }}>
            Management Table
        </text>

        <div className='insidertable' style={{ fontSize: '11px', marginBottom: 10 }}>
            <div className='col-12'>
                <div className='table-responsive-lg text-center'>
                    <table className='table table-classic table-hover'>
                        <thead className='insiderhead bg-primary'>
                            <tr>
                                <th colSpan='1'>Position</th>
                                <th colSpan='1'>Name</th>
                                <th colSpan='1'>Academic</th>
                                <th colSpan='1'>Corporate</th>
                                <th colSpan='1'>M&A</th>
                                <th colSpan='1'>Negatives</th>
                                <th colSpan='1'>Shares Owned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trials?.map((trial) => (
                                <tr key={Math.random()}>
                                    <td>
                                        <a href='#'>{trial?.position}</a>
                                    </td>
                                    <td>{trial?.name}</td>
                                    <td>{trial?.academic}</td>
                                    <td>{trial?.corporate}</td>
                                    <td>{trial?.manda}</td>
                                    <td>{trial?.negative}</td>
                                    <td>{trials?.sharesowned}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
		</>
	);
};

export default ManagementTable;