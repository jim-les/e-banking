import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
    getAccount,
} from "../../state/features/Account/accountSlice";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);

export const Reports = () => {
    const dispatch = useDispatch();

    const { info } = useSelector((state) => state.userData);
    const { account, isLoading: isUserAccountLoading } = useSelector((state) => state.userAccount);
    const { user } = useSelector((state) => state.userAuth);

    const accountId = account?._id
        ? account?._id
        : info?.accounts?.length > 0
            ? info?.accounts[0]
            : null;

    // State for preferred account
    const [preferedAccount, setPreferedAccount] = useState(accountId);

    // Get account data
    useEffect(() => {
        if (info && info.accounts.length > 0 && preferedAccount) {
            const payload = {
                token: user.token,
                accountId: info.accounts.find(
                    (account) => account === preferedAccount.toString()
                ),
            };
            dispatch(getAccount(payload));
        }
    }, [info, preferedAccount]);

    // Data calculations
    const incomingData = account?.in?.reduce((total, log) => total + log.balance_transfered, 0) || 0;
    const outgoingData = account?.out?.reduce((total, log) => total + log.balance_transfered, 0) || 0;
    const depositedData = account?.deposit_logs?.reduce((total, log) => total + log.depositted_amount, 0) || 0;
    const withdrawnData = account?.withdraw_logs?.reduce((total, log) => total + log.withdrawn_amount, 0) || 0;

    const netTransactions = incomingData - outgoingData;
    const transactionRatio = outgoingData > 0 ? (incomingData / outgoingData).toFixed(2) : "N/A";

    // Chart data
    const pieData = {
        labels: ["Incoming Transactions", "Outgoing Transactions", "Deposits", "Withdrawals"],
        datasets: [
            {
                data: [incomingData, outgoingData, depositedData, withdrawnData],
                backgroundColor: ["#4caf50", "#f44336", "#2196f3", "#ff9800"],
            },
        ],
    };

    const barData = {
        labels: ["Incoming", "Outgoing", "Deposits", "Withdrawals"],
        datasets: [
            {
                label: "KES",
                data: [incomingData, outgoingData, depositedData, withdrawnData],
                backgroundColor: ["#4caf50", "#f44336", "#2196f3", "#ff9800"],
            },
        ],
    };

    const trendData = {
        labels: ["January", "February", "March", "April"], // Replace with actual time data
        datasets: [
            {
                label: "Incoming",
                data: [5000, 10000, 8000, 12000], // Replace with actual data
                borderColor: "#4caf50",
                fill: false,
            },
            {
                label: "Outgoing",
                data: [3000, 7000, 4000, 9000], // Replace with actual data
                borderColor: "#f44336",
                fill: false,
            },
        ],
    };

    return (
        <div className="flex flex-col items-center px-4 py-8 max-w-5xl w-full">
            <div className="w-full flex items-center justify-center flex-col gap-4 p-3 text-left font-bold text-blue-900 border-b-4 border-r-4 border-blue-800 rounded shadow mb-10">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Reports</h2>
                <button
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
                    onClick={() => window.print()}
                >
                    Print Report
                </button>
            </div>

            {/* Table Section */}
            <div className="w-full mb-10 bg-blue-200 border-y-4 border-blue-800 rounded shadow">
                <table className="table-auto w-full text-center border-collapse border border-blue-800">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-4 py-2">Transaction Type</th>
                            <th className="px-4 py-2">Amount (KES)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-slate-200">
                            <td className="border px-4 py-2">Incoming Transactions</td>
                            <td className="border px-4 py-2">{incomingData}</td>
                        </tr>
                        <tr className="bg-slate-100">
                            <td className="border px-4 py-2">Outgoing Transactions</td>
                            <td className="border px-4 py-2">{outgoingData}</td>
                        </tr>
                        <tr className="bg-slate-200">
                            <td className="border px-4 py-2">Deposits</td>
                            <td className="border px-4 py-2">{depositedData}</td>
                        </tr>
                        <tr className="bg-slate-100">
                            <td className="border px-4 py-2">Withdrawals</td>
                            <td className="border px-4 py-2">{withdrawnData}</td>
                        </tr>
                        <tr className="bg-slate-200">
                            <td className="border px-4 py-2">Net Transactions</td>
                            <td className="border px-4 py-2">{netTransactions}</td>
                        </tr>
                        <tr className="bg-slate-100">
                            <td className="border px-4 py-2">Incoming/Outgoing Ratio</td>
                            <td className="border px-4 py-2">{transactionRatio}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Charts Section */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <div className="p-6 bg-white border border-blue-800 rounded shadow">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Transaction Summary (Bar Chart)</h3>
                    <Bar data={barData} />
                </div>

                {/* Pie Chart */}
                <div className="p-6 bg-white border border-blue-800 rounded shadow">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Transaction Distribution (Pie Chart)</h3>
                    <Pie data={pieData} />
                </div>

                {/* Line Chart */}
                <div className="p-6 bg-white border border-blue-800 rounded shadow">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Transaction Trends (Line Chart)</h3>
                    <Line data={trendData} />
                </div>
            </div>
        </div>
    );
};
