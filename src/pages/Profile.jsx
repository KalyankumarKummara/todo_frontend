import DashboardLayout from "../components/DashboardLayout";
import PageTransition from "../components/PageTransition";
import AnimatedPageHeader from "../components/AnimatedPageHeader";
import { getCurrentUser } from "../services/taskService";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import EditProfileForm from "../components/EditProfileForm";
import ChangePasswordForm from "../components/ChangePasswordForm";


const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isModalOpen = showEdit || showPassword;


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data);
            } catch (err) {
                console.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    

    return (
        <DashboardLayout title="Profile" isModalOpen={isModalOpen}>
    <PageTransition>
                {loading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Spinner size="lg" variant="primary" />
            </div>
        ) : (
            
                <div className="max-w-5xl mx-auto px-4 py-6">
                    <AnimatedPageHeader
                        title="Your Profile"
                        subtitle="Manage your account information"
                    />

                    {/* Profile Card */}
                    <div className="bg-neutral-white border dark:bg-neutral-dark border-neutral-light dark:border-neutral-darkest rounded-2xl shadow-sm p-6 mt-6">
                        {/* Header */}
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-heading font-bold text-neutral-white dark:text-neutral-darkest">
                                {user?.username?.[0]?.toUpperCase()}
                            </div>

                            <div>
                                <h2 className="text-xl font-heading font-semibold text-neutral-darkest dark:text-neutral-white">
                                    {user?.username}
                                </h2>
                                <p className="text-sm font-body text-neutral-dark dark:text-neutral-light">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="my-6 h-px bg-neutral-light dark:bg-neutral-darkest" />

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <ProfileItem label="Username" value={user?.username} />
                            <ProfileItem label="Email" value={user?.email} />
                            <ProfileItem label="User ID" value={user?._id} />
                            <ProfileItem
                                label="Account Status"
                                value="Active"
                                badge
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            <button
                                onClick={() => setShowEdit(true)}
                                className="px-5 py-2.5 rounded-xl bg-primary text-neutral-white font-body text-sm hover:bg-primary-hover transition"
                            >
                                Edit Profile
                            </button>

                            <button
                                onClick={() => setShowPassword(true)}
                                className="px-5 py-2.5 rounded-xl bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light font-body text-sm hover:bg-neutral-dark dark:hover:bg-neutral-light hover:text-neutral-white dark:hover:text-neutral-dark transition"
                            >
                                Change Password
                            </button>
                        </div>

                    </div>
                    {showEdit && (
                        <Modal title="Edit Profile" onClose={() => setShowEdit(false)}>
                            <EditProfileForm
                                user={user}
                                onSuccess={(updatedUser) => {
                                    setUser(updatedUser);
                                    setShowEdit(false);
                                }}
                            />
                        </Modal>
                    )}

                    {showPassword && (
                        <Modal title="Change Password" onClose={() => setShowPassword(false)}>
                            <ChangePasswordForm onClose={() => setShowPassword(false)} />
                        </Modal>
                    )}


                </div>
        )}
            </PageTransition>
        </DashboardLayout>
    );
};

const ProfileItem = ({ label, value, badge }) => (
    <div>
        <p className="text-xs font-body text-neutral-dark dark:text-neutral-light mb-1">{label}</p>
        {badge ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                {value}
            </span>
        ) : (
            <p className="text-sm font-body text-neutral-darkest dark:text-neutral-white break-all">
                {value}
            </p>
        )}
    </div>
);

export default Profile;
