import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaStickyNote, FaCheckCircle } from "react-icons/fa";

export default function AdminPanel() {
    const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
    const API_URL = (configuredApiUrl || (import.meta.env.DEV ? "http://localhost:5000" : "")).replace(/\/$/, "");
    const [rsvps, setRsvps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [editEntry, setEditEntry] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('name-asc');
    
    const headers = ["Name", "Phone", "Attending", "Dinner", "IndividualAttendance"];

    const rows = rsvps.map((entry) => [
        entry.name,
        entry.phone,
        entry.attending ? 'Yes' : "No",
        entry.dinner ? 'Yes' : 'No',
        entry.individual_attendance
            ? Object.entries(entry.individual_attendance)
            .map(([guestName, { rsvp, dinner }]) => {
                return `${guestName}: ${rsvp} (${dinner || '-'})`
            })
            .join('; ')
        : '-'
    ]);

    const headerLine = headers.join(',');
    const rowLines = rows.map(row => row.join(','));
    const csvContent = [headerLine, ...rowLines].join('\n');

    function handleDownload() {
        const csvBlob = new Blob([csvContent], { type: 'text/csv' });
        const csvUrl = URL.createObjectURL(csvBlob);

        const a = document.createElement('a');
        a.href = csvUrl;
        a.download = 'rsvps.csv';

        a.click();

        URL.revokeObjectURL(csvUrl);
    }
    
    const fetchRsvps = useCallback(async () => {
        setLoading(true);
        
        try {
            const res = await fetch(`${API_URL}/api/admin/rsvps`);
            const contentType = res.headers.get('content-type') || '';
            const data = contentType.includes('application/json') ? await res.json() : null;

            if (!res.ok) {
                throw new Error(data?.error || `Failed to load RSVPs (${res.status})`);
            }

            if (!data) {
                throw new Error('Admin API did not return JSON. Check VITE_API_URL or backend routing.');
            }
            
            setRsvps(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching RSVPs:", err);
            toast.error(err.message || 'Error loading RSVPs');
            setLoading(false);
        }
    }, [API_URL]);
    
    useEffect(() => {
        fetchRsvps();
    }, [fetchRsvps]);

    function filterRsvps ( rsvpList, filterChoice, search ) {
        return rsvpList.filter((entry) => {
            if (filterChoice === 'dinner') {
                if (entry.attending !== true) {
                    return false;
                }
                if (entry.dinner === "yes") {
                    return true;
                }
            }
            
            if (filterChoice === 'yes') {
                if (entry.attending !== true) {
                    return false;
                }
                if (search === '') {
                    return true;
                }
                if (entry.name.toLowerCase().includes(search.toLowerCase()) || entry.phone.includes(search)) {
                    return true;
                }
            }

            if (filterChoice === 'no') {
                if (entry.attending !== false) {
                    return false;
                }
                if (search === '') {
                    return true;
                }
                if (entry.name.toLowerCase().includes(search.toLowerCase()) || entry.phone.includes(search)) {
                    return true;
                }

                return false;
            }

            if (filterChoice === 'contacted') {
                if (entry.contacted !== true) {
                    return false;
                }
                if (search === '') {
                    return true;
                }
                if (entry.name.toLowerCase().includes(search.toLowerCase()) || entry.phone.includes(search)) {
                    return true;
                }
                return false;
            }

            if (filterChoice === 'not contacted') {
                if (entry.contacted !== false) {
                    return false;
                }
                if (search === '') {
                    return true;
                }
                if (entry.name.toLowerCase().includes(search.toLowerCase()) || entry.phone.includes(search)) {
                    return true;
                }
                return false;
            }

            if (filterChoice === 'all') {
                if (search === '') {
                    return true
                }
                if (entry.name.toLowerCase().includes(search.toLowerCase()) || entry.phone.includes(search)) {
                    return true;
                }

                return false;
            }

            return true;
        })

        .sort((a, b) => {
            if (sortOption === 'name-asc') {
                return a.name.localeCompare(b.name);
            }
            if (sortOption === 'name-desc') {
                return b.name.localeCompare(a.name);
            }
            if (sortOption === 'newest') {
                return new Date(b.timestamp) - new Date(a.timestamp);
            }
            if (sortOption === 'oldest') {
                return new Date(a.timestamp) - new Date(b.timestamp);
            }
            return 0;
        });
    }

    // RSVP and Dinner Attendance totals
    function calcTotals (rsvpList) {
        return rsvpList.reduce(
            (acc, entry) => {
                const individualAttendance = entry.individual_attendance;

                if (entry.attending === true || entry.attending === 'yes') {
                    acc.rsvp += 1;
                }

                if (entry.dinner === true || entry.dinner === 'yes') {
                    acc.dinner += 1;
                }
                
                if (
                    individualAttendance
                    && typeof individualAttendance === 'object'
                    && Object.keys(individualAttendance).length > 0
                ) {
                    const guests = Object.values(individualAttendance);
                    acc.rsvp += guests.filter((guest) => guest?.rsvp === 'yes').length;
                    acc.dinner += guests.filter((guest) => guest?.dinner === 'yes').length;
                }
                return acc;
            },
        { rsvp: 0, dinner: 0 },
    );
    }

    const totals = calcTotals(rsvps);

    const filteredRsvps = filterRsvps(rsvps, filter, searchTerm);

    const handleDelete = async (rsvpId) => {
        if(!window.confirm("Are you sure you want to delete this RSVP?")) return;

        try {
            const res = await fetch(`${API_URL}/api/admin/rsvp/${rsvpId}`,{
                method: 'DELETE',
            });

            const data = await res.json();

            if(res.ok) {
                toast.success('RSVP deleted');
                setRsvps(prev => prev.filter(r => r.id !== rsvpId));
            } else {
                toast.error(data.error || 'Failed to delete RSVP');
            }
        } catch (err) {
            console.error("Delete error:", err);
            toast.error('Server error');
        }
    };

    const handleEdit = (entry) => {
        setEditEntry({
            ...entry,
            contacted: entry.contacted ?? false,
        });
    };

    const submitEdit = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/rsvps/${editEntry.id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editEntry),
            });

            const data = await response.json();

            if(response.ok) {
                toast.success("RSVP Updated!");

                fetchRsvps();
                setEditEntry(null);
            } else {
                toast.error(data.error || "Failed to update RSVP");
            }
        } catch (err) {
            console.error("Update error:", err);
            toast.error("Server error while updating RSVP")
        }
    }

    return (
        <div className="relative min-h-screen pt-24 pb-24 px-6">
            <img 
                src="/images/bg-pastel.png"
                className="absolute inset-0 w-full h-full z-0"
            />
            <h2 className="relative text-2xl font-bold mb-4">
                RSVP Admin Panel
            </h2>

            <button
                className="relative mb-4 px-3 py-2 bg-mauve text-white rounded"
                onClick={fetchRsvps}
            >
                Refresh RSVPs
            </button>

            <div className="relative mb-4 flex flex-wrap gap-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-mauve text-white' : 'bg-gray-200'}`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter('yes')}
                    className={`px-4 py-2 rounded ${filter === 'yes' ? 'bg-mauve text-white' : 'bg-gray-200'}`}
                >
                    Attending
                </button>
                <button
                    onClick={() => setFilter('no')}
                    className={`px-4 py-2 rounded ${filter === 'no' ? 'bg-mauve text-white' : 'bg-gray-200'}`}
                >
                    Not Attending
                </button>
                <button
                    onClick={() => setFilter("contacted")}
                    className={`px-4 py-2 rounded ${filter === 'contacted' ? 'bg-mauve text-white' : 'bg-gray-200'}`}
                >
                    Contacted
                </button>
                <button
                    onClick={() => {setFilter('not contacted')}}
                    className={`px-4 py-2 rounded ${filter === 'not contacted' ? 'bg-mauve text-white' : 'bg-gray-200'}`}
                >
                    Not Contacted
                </button>
                
            </div>

            <div className="relative mb-2 space-x-2">
                <button 
                onClick={() => {setSortOption('name-asc')}}
                    className={`px-4 py-2 rounded ${sortOption === 'name-asc' ? 'bg-rust text-white' : 'bg-gray-200'}`}
                >
                    A-Z
                </button>
                <button
                    onClick={() => {setSortOption('name-desc')}} 
                    className={`px-4 py-2 rounded ${sortOption === 'name-desc' ? 'bg-rust text-white' : 'bg-gray-200'}`}
                >
                    Z-A
                </button>
                <button
                    onClick={() => {setSortOption('newest')}} 
                    className={`px-4 py-2 rounded ${sortOption === 'newest' ? 'bg-rust text-white' : 'bg-gray-200'}`}
                >
                    Newest
                </button>
                <button
                    onClick={() => {setSortOption('oldest')}} 
                    className={`px-4 py-2 rounded ${sortOption === 'oldest' ? 'bg-rust text-white' : 'bg-gray-200'}`}
                >
                    Oldest
                </button>
            </div>

            <div className="relative mb-4">
                <input 
                    className="p-2 rounded shadow-md text-grey-500 sm:mt-2"
                    placeholder="Search RSVP"
                    onChange={(e) => (
                        setSearchTerm(e.target.value)
                    )}
                />
            </div>
            
            {loading ? (
                <p className="relative">Loading...</p>
                ) : filteredRsvps.length === 0 ? (
                <p className="relative">No RSVPs found</p>
                ) : (
                <>
                    <div className="relative overflow-x-auto max-w-full"><table className="w-full border-collapse min-w-[980px]">
                        <thead>
                            <tr className="bg-mauve text-white">
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Phone</th>
                                <th className="p-2 border">Attending</th>
                                <th className="p-2 border">Dinner</th>
                                <th className="p-2 border">Individual Guests</th>
                                <th className="p-2 border">Timestamp</th>
                                <th className="p-2 border">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRsvps.map((entry, i) => (
                                <tr key={i} className="bg-white">
                                    <td className="p-2 border">{entry.name}</td>
                                    <td className="p-2 border">{entry.phone}</td>
                                    <td className="p-2 border">{entry.attending ? 'Yes' : 'No'}</td>
                                    <td className="p-2 border">{entry.dinner ? 'Yes' : 'No'}</td>
                                    <td className="p-2 border text-sm whitespace-pre-wrap">{entry.individual_attendance
                                        ? Object.entries(entry.individual_attendance).map(
                                            ([guest, { rsvp, dinner}]) =>
                                            `${guest}: ${rsvp} (${dinner || '-'})`
                                        ).join('\n')
                                        : '-'}
                                    </td>
                                    <td className="p-2 border text-sm">
                                        {new Date(entry.timestamp).toLocaleString('en-US', {
                                            dateStyle: 'medium',
                                            timeStyle: 'short',
                                        })}
                                    </td>
                                    {/* Status Icons */}
                                    <td className="p-2 border">
                                        <label className="flex items-center space-x-2">
                                            {entry.contacted && (
                                                <span title="Contacted"> <FaCheckCircle className="text-sage"/> </span>
                                            )}
                                            {entry.notes &&  (
                                            <span title="Has Notes"> <FaStickyNote className="text-peach"/> </span>
                                            )}
                                            
                                        </label>
                                    </td>
                                    <td className="p-2 border">
                                        <button
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleEdit(entry)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="p-2 border">
                                        <button
                                            onClick={() => handleDelete(entry.id)}
                                            className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                    
                                </tr>
                            ))}
                        </tbody>
                    </table></div>
                    
                    {editEntry && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-50">
                            <div className="bg-white rounded shadow-lg p-6 w-[90%] max-w-md">
                                <h2 className="text-xl font-bold mb-4">
                                    Edit RSVP
                                </h2>
                                <label className="block mb-2 font-medium">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    value={editEntry.phone}
                                    onChange={(e) => setEditEntry({ ...editEntry, phone: e.target.value })}
                                    className="w-full border px-3 py-2 mb-4 rounded"
                                />
                                <label className="block mb-2 font-medium">
                                    Attending
                                </label>
                                <select
                                    value={editEntry.attending ? 'yes' : 'no'}
                                    onChange={(e) => setEditEntry({...editEntry, attending: e.target.value === 'yes' })}
                                    className="w-full border px-3 py-2 mb-4 rounded"
                                >
                                    <option value="yes">yes</option>
                                    <option value="no">no</option>
                                </select>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={editEntry.contacted}
                                        onChange={(e) => setEditEntry({...editEntry, contacted: e.target.checked})}
                                    />
                                    <span>Contacted</span>
                                </label>
                                <textarea 
                                    className="mt-2 border border-black rounded px-3 py-2 w-full"
                                    placeholder="Notes..."
                                    value={editEntry.notes}
                                    onChange={(e) => setEditEntry({...editEntry, notes: e.target.value})}
                                />
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        onClick={submitEdit}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className=" bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                        onClick={() => setEditEntry(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
            <div className="relative mt-6 bg-white p-2 flex space-x-2 items-center px-6 w-48 rounded shadow">
                <h1 className="text-sm font-semibold">Total Attending RSVPs: </h1>
                <span className="text-3xl text-peach font-bold">{totals.rsvp}</span>
            </div>

            <div className="relative mt-6 bg-white p-2 flex space-x-2 items-center px-6 w-48 rounded shadow">
                <h1 className="text-sm font-semibold">Total Attending Dinner: </h1>
                <span className="text-3xl text-peach font-bold">{totals.dinner}</span>
            </div>
            
            <div className="relative pt-8">
                <button className="bg-sage rounded shadow-md text-grey-500 p-2 text-white text-sm"
                    onClick={handleDownload}
                    disabled={rsvps.length === 0}
                >
                    Export CSV
                </button>
            </div>
        </div>
    );
}