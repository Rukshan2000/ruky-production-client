import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Logo from "../assets/logo.png";
import Sign from "../assets/sign.jpeg";
import Qr from "../assets/qr.png";
import QrDark from "../assets/qrdark.jpeg";

function InvoiceTemplate({ data }) {
    const [darkMode, setDarkMode] = useState(false); // State to manage dark mode
    const invoiceRef = useRef();

    const calculateBalanceDue = () => {
        const total = data.items.reduce((sum, item) => sum + parseFloat(item.total), 0);
        const balanceDue = total - parseFloat(data.discount || 0) - parseFloat(data.advance || 0);
        return balanceDue.toFixed(2);
    };

    const cleanFileName = (name) => {
        return name.replace(/\s+/g, '_').replace(/[^\w_-]+/g, '');
    };

    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
        documentTitle: `Invoice_${cleanFileName(data.clientName)}`
    });

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div style={{ width: '210mm', height: '297mm' }}> {/* A4 size: 210mm x 297mm */}
            {/* Use conditional classes based on darkMode state */}
            <div ref={invoiceRef} className={`max-w-full p-6 mx-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-md`}>
                {/* Invoice content */}
                <div className="flex items-center justify-between">
                    <img src={Logo} alt="Logo" className="h-16" />
                    <div>
                        <p className="text-lg">INVOICE NO: #{data.invoiceNumber}</p>
                        <p className={`text-gray-700 ${darkMode ? 'text-white' : ''}`}>Date: {data.date}</p>
                    </div>
                </div>
                {/* Rest of the content */}
                <div className="pb-4 mb-4 text-center border-b">
                    <div className="text-2xl font-bold">Ruky Production</div>
                    <div className="text-lg">Professional Sinhala Voice Over and Video Productions</div>
                </div>
                <div className="flex justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold">Customer Details</h3>
                        <p className={`text-gray-700 mt-5 ${darkMode ? 'text-white' : ''}`}><b>Client Name:</b> {data.clientName}</p>
                        <p className={`text-gray-700 ${darkMode ? 'text-white' : ''}`}><b>Contact No:</b> {data.clientContact}</p>
                    </div>
                </div>
                <table className="w-full mb-6 border-collapse">
                    <thead>
                        <tr>
                            <th className={`px-4 py-2 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'} border`}>No</th>
                            <th className={`px-4 py-2 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'} border`}>Service</th>
                            <th className={`px-4 py-2 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'} border`}>Description</th>
                            <th className={`px-4 py-2 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'} border`}>Amount ({data.currency})</th>
                            <th className={`px-4 py-2 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'} border`}>Total ({data.currency})</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{item.service}</td>
                                <td className="px-4 py-2 border">{item.description}</td>
                                <td className="px-4 py-2 border">{item.amount} {data.currency}</td>
                                <td className="px-4 py-2 border">{item.total} {data.currency}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4" className="px-4 py-2 font-semibold text-right">Discount</td>
                            <td className="px-4 py-2">{data.discount || 0} {data.currency}</td>
                        </tr>
                        <tr>
                            <td colSpan="4" className="px-4 py-2 font-semibold text-right">Advance</td>
                            <td className="px-4 py-2">{data.advance || 0} {data.currency}</td>
                        </tr>
                        <tr>
                            <td colSpan="4" className="px-4 py-2 font-bold text-right border">Total Due</td>
                            <td className="px-4 py-2 font-bold border">{calculateBalanceDue()} {data.currency}</td>
                        </tr>
                    </tbody>
                </table>
                <p className="text-red-500">{data.redNote}</p>
                <div className="flex justify-between">
                    <div className='mt-20'>
                        <p className="text-lg font-semibold">
                            Please kindly deposit/transfer your payment into the <br />
                            following bank account
                        </p>
                        <p className="mt-4 text-lg"><b>Bank</b>: Bank Of Ceylon</p>
                        <p className="text-lg"><b>Name</b>: K.V. Rukshan Udaya Priyanath</p>
                        <p className="text-lg"><b>Acc No</b>: 90924099</p>
                        <p className="text-lg"><b>Branch</b>: Anawilundawa</p>
                    </div>
                    <div className='mt-20'>
                        <img src={Sign} alt="Sign" className="h-20" />
                        <p>.................................</p>
                        <h3 className="text-lg font-bold">Authorised Sign</h3>
                        <p className="text-gray-700">K.V.R.U.Priyanath</p>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-20">
                    <img src={darkMode ? QrDark : Qr} alt="Qr" className="h-16" />
                    <div>
                        <p className={`text-gray-700 ${darkMode ? 'text-white' : ''}`}><b>Contact</b>: +94 76 381 3014</p>
                        <p className={`text-gray-700 ${darkMode ? 'text-white' : ''}`}><b>Email</b>: rukshanpriyanath.voice@gmail.com</p>
                    </div>
                </div>
            </div>
            {/* Switch button for toggling dark mode */}
            <div className="flex justify-center mt-4">
                <label htmlFor="darkModeToggle" className="inline-flex items-center cursor-pointer">
                    <span className="mr-2 text-black">Dark Mode</span>
                    <input type="checkbox" id="darkModeToggle" checked={darkMode} onChange={toggleDarkMode} className="w-5 h-5 text-blue-600 form-checkbox" />
                </label>
            </div>
            {/* Button to download invoice */}
            <button onClick={handlePrint} className={`px-4 py-2 mt-4 text-white rounded ${darkMode ? 'bg-blue-500' : 'bg-green-500'}`}>Download Invoice</button>
        </div>
    );
}

export default InvoiceTemplate;
