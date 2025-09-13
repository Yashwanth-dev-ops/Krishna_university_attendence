
import React, { useState, useMemo } from 'react';
import { StudentInfo, AdminInfo, Year, AttendanceRecord } from '../types';
import { emotionUIConfig } from './uiConfig';
import { StatCard } from './StatCard';
import { RadialProgress } from './RadialProgress';


interface TeacherDashboardProps {
    currentUser: AdminInfo;
    studentDirectory: Map<string, StudentInfo>;
    attendance: AttendanceRecord[];
    faceLinks: Map<number, string>;
    onLogout: () => void;
    onDownload: (filteredAttendance: AttendanceRecord[]) => void;
    onLaunchAnalyzer: () => void;
}

const StudentProfileModal: React.FC<{
    student: StudentInfo;
    attendance: AttendanceRecord[];
    faceLinks: Map<number, string>;
    onClose: () => void;
}> = ({ student, attendance, faceLinks, onClose }) => {
    
    const studentPersistentId = useMemo(() => {
        for (const [pid, roll] of faceLinks.entries()) {
            if (roll === student.rollNumber) return pid;
        }
        return null;
    }, [faceLinks, student.rollNumber]);

    const studentAttendance = useMemo(() => {
        if (studentPersistentId === null) return [];
        return attendance
            .filter(record => record.persistentId === studentPersistentId)
            .sort((a, b) => b.timestamp - a.timestamp);
    }, [attendance, studentPersistentId]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700 w-full max-w-2xl m-4 flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-start justify-between pb-4 border-b border-slate-700">
                    <div className="flex items-center gap-4">
                        {student.photoBase64 ? (
                            <img src={student.photoBase64} alt={student.name} className="w-20 h-20 rounded-full object-cover border-2 border-slate-600" />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-indigo-300 font-bold text-3xl">
                                {student.name.charAt(0)}
                            </div>
                        )}
                        <div>
                            <h2 className="text-3xl font-bold text-white">{student.name}</h2>
                            <p className="text-lg text-gray-400">{student.rollNumber}</p>
                            <p className="text-md text-indigo-300 mt-1">{student.department} - {student.year}</p>
                        </div>
                    </div>
                     <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-full text-gray-400 hover:bg-slate-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <div className="mt-6 flex-grow overflow-y-auto pr-2">
                     <h3 className="text-xl font-bold text-gray-200 mb-3">Attendance Log ({studentAttendance.length})</h3>
                     <div className="bg-slate-900/50 rounded-lg">
                        {studentAttendance.length === 0 ? (
                            <p className="text-center text-gray-500 p-8">No attendance records found for this student.</p>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="sticky top-0 bg-slate-900/80 backdrop-blur-sm">
                                    <tr>
                                        <th className="p-3 text-sm font-semibold text-gray-400">Date</th>
                                        <th className="p-3 text-sm font-semibold text-gray-400">Time</th>
                                        <th className="p-3 text-sm font-semibold text-gray-400">Emotion</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {studentAttendance.map(record => {
                                        const date = new Date(record.timestamp);
                                        return (
                                            <tr key={record.timestamp} className="hover:bg-slate-800/60">
                                                <td className="p-3 text-sm text-gray-300">{date.toLocaleDateString()}</td>
                                                <td className="p-3 text-sm text-gray-300">{date.toLocaleTimeString()}</td>
                                                <td className="p-3 text-sm text-gray-300 flex items-center gap-2">
                                                    <span>{emotionUIConfig[record.emotion].emoji}</span>
                                                    <span>{record.emotion}</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                     </div>
                </div>

                <footer className="mt-6 pt-4 border-t border-slate-700 text-right">
                    {student.isBlocked && <p className="text-sm font-bold text-red-400 float-left pt-2">This account is currently BLOCKED.</p>}
                     <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
};

const UsersIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" />
    </svg>
);

const CheckCircleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const TeacherDashboard: React.FC<TeacherDashboardProps> = (props) => {
    const { currentUser, studentDirectory, attendance, faceLinks, onLogout, onDownload, onLaunchAnalyzer } = props;
    
    // Filtering and modal state
    const [yearFilter, setYearFilter] = useState<string>('ALL');
    const [selectedStudent, setSelectedStudent] = useState<StudentInfo | null>(null);

    const filteredStudents = useMemo(() => {
        // Teachers can only see students in their own department.
        return Array.from(studentDirectory.values()).filter(student => {
            const departmentMatch = student.department === currentUser.department;
            const yearMatch = yearFilter === 'ALL' || student.year === yearFilter;
            return departmentMatch && yearMatch;
        }).sort((a, b) => a.name.localeCompare(b.name));
    }, [studentDirectory, currentUser.department, yearFilter]);

    const analytics = useMemo(() => {
        const today = new Date().toDateString();
        
        const visibleStudents = Array.from(studentDirectory.values())
            .filter(student => student.department === currentUser.department);
        const totalStudents = visibleStudents.length;
        const visibleStudentRollNumbers = new Set(visibleStudents.map(s => s.rollNumber));

        const todaysAttendanceRecords = attendance.filter(record => {
            if (new Date(record.timestamp).toDateString() !== today) return false;
            const rollNumber = faceLinks.get(record.persistentId);
            return rollNumber ? visibleStudentRollNumbers.has(rollNumber) : false;
        });
        
        const presentRollNumbers = new Set<string>();
        todaysAttendanceRecords.forEach(record => {
            const rollNumber = faceLinks.get(record.persistentId);
            if (rollNumber) {
                presentRollNumbers.add(rollNumber);
            }
        });

        const attendanceToday = presentRollNumbers.size;
        const attendanceRate = totalStudents > 0 ? (attendanceToday / totalStudents) * 100 : 0;
        
        const recentActivity = todaysAttendanceRecords
            .slice(-3)
            .reverse()
            .map(record => {
                const rollNumber = faceLinks.get(record.persistentId);
                const student = rollNumber ? studentDirectory.get(rollNumber) : null;
                return student ? { name: student.name, time: new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : null;
            })
            .filter((item): item is { name: string; time: string } => item !== null);

        return { totalStudents, attendanceToday, attendanceRate, recentActivity };
    }, [studentDirectory, attendance, faceLinks, currentUser.department]);

    const handleDownloadClick = () => {
        const filteredRollNumbers = new Set(filteredStudents.map(s => s.rollNumber));
        const persistentIdsForReport = new Set<number>();
        for (const [pid, roll] of faceLinks.entries()) {
            if (filteredRollNumbers.has(roll)) {
                persistentIdsForReport.add(pid);
            }
        }
        const filteredAttendance = attendance.filter(record => persistentIdsForReport.has(record.persistentId));
        onDownload(filteredAttendance);
    };

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col animate-fade-in">
             {selectedStudent && (
                <StudentProfileModal
                    student={selectedStudent}
                    attendance={attendance}
                    faceLinks={faceLinks}
                    onClose={() => setSelectedStudent(null)}
                />
            )}
             <header className="mb-6 w-full flex justify-between items-center">
                <div className="flex items-center gap-4">
                    {currentUser.photoBase64 ? (
                        <img src={currentUser.photoBase64} alt={currentUser.name} className="w-14 h-14 rounded-full object-cover border-2 border-slate-600" />
                    ) : (
                         <img src="https://krucet.ac.in/wp-content/uploads/2020/09/cropped-kru-150-round-non-transparent-1.png" alt="Krishna University Logo" className="w-14 h-14 rounded-full" />
                    )}
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-200">Teacher Dashboard</h1>
                        <p className="text-sm text-gray-400">Welcome, {currentUser.name} ({currentUser.department})</p>
                    </div>
                </div>
                <button onClick={onLogout} className="px-4 py-2 rounded-md font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-transform duration-100 ease-in-out focus:outline-none focus:ring-2 focus:ring-rose-500 active:translate-y-0.5 shadow-lg">
                    Logout
                </button>
            </header>

            <main className="w-full bg-slate-800/40 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-800 backdrop-blur-sm">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">Department Overview</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="md:col-span-2 lg:col-span-1 bg-slate-900/50 p-4 rounded-lg flex flex-col items-center justify-center text-center border border-slate-800">
                            <h3 className="text-lg font-semibold text-indigo-300 mb-2">Today's Attendance Rate</h3>
                            <RadialProgress percentage={analytics.attendanceRate} />
                        </div>
                        <div className="md:col-span-2 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <StatCard icon={<UsersIcon />} title={`Students in ${currentUser.department}`} value={analytics.totalStudents} />
                            <StatCard icon={<CheckCircleIcon />} title="Present Today" value={analytics.attendanceToday} />
                            <div className="sm:col-span-2 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                <h3 className="text-sm font-semibold text-gray-400 mb-2">Recent Activity</h3>
                                {analytics.recentActivity.length > 0 ? (
                                    <ul className="space-y-2">
                                        {analytics.recentActivity.map((activity, index) => (
                                            <li key={index} className="text-sm text-gray-300 flex justify-between items-center">
                                                <span>{activity.name}</span>
                                                <span className="text-gray-500 text-xs">{activity.time}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-2">No attendance marked today.</p>
                                )}
                            </div>
                        </div>
                        <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-indigo-900/60 to-slate-900/50 p-6 rounded-lg flex flex-col justify-center items-center text-center border border-indigo-700/50">
                            <h3 className="text-xl font-bold text-white">Live Monitoring</h3>
                            <p className="text-indigo-200 mt-2 mb-4 text-sm">Launch the real-time camera view to automatically mark attendance.</p>
                            <button onClick={onLaunchAnalyzer} className="px-6 py-3 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 active:translate-y-0.5 whitespace-nowrap">
                                Start Live Session &rarr;
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Actions</h2>
                             <button onClick={handleDownloadClick} disabled={filteredStudents.length === 0} className="w-full px-6 py-3 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-0.5">
                                Download Report (CSV)
                            </button>
                        </div>
                         <div>
                            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Instructions</h2>
                            <div className="bg-slate-900/50 p-4 rounded-lg text-gray-400 text-sm space-y-2">
                                <p><span className="font-bold text-gray-300">View Profile:</span> Click on any student row to view their detailed profile and full attendance history.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                         <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-indigo-300">Students in {currentUser.department} ({filteredStudents.length})</h2>
                            <div className="flex gap-2">
                                <select value={yearFilter} onChange={e => setYearFilter(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 transition">
                                    <option value="ALL">All Years</option>
                                    {Object.values(Year).map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                         </div>
                         <div className="bg-slate-900/50 rounded-lg max-h-[60vh] overflow-y-auto">
                            {filteredStudents.length === 0 ? (
                                <p className="text-center text-gray-500 p-8">No students found in this department.</p>
                            ) : (
                                <div className="divide-y divide-slate-800">
                                {filteredStudents.map(student => (
                                    <div key={student.rollNumber} onClick={() => setSelectedStudent(student)} className={`p-4 flex justify-between items-center hover:bg-slate-800/60 transition-colors cursor-pointer ${student.isBlocked ? 'opacity-50' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            {student.photoBase64 ? (
                                                <img src={student.photoBase64} alt={student.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-600" />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-indigo-300 font-bold text-lg">
                                                    {student.name.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold text-white">{student.name} {student.isBlocked && <span className="text-xs font-bold text-red-400">(Blocked)</span>}</p>
                                                <p className="text-sm text-gray-400">{student.rollNumber}</p>
                                                <p className="text-xs text-indigo-300 bg-indigo-900/50 inline-block px-2 py-0.5 rounded mt-1">{student.department} - {student.year}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            )}
                         </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
