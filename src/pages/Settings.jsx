import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

import DashboardLayout from "../components/DashboardLayout";
import PageTransition from "../components/PageTransition";
import AnimatedPageHeader from "../components/AnimatedPageHeader";
import Modal from "../components/Modal";
import ChangePasswordForm from "../components/ChangePasswordForm";
import Spinner from "../components/Spinner";
import DeleteAccountModal from "../components/DeleteAccountModal";
import { getCurrentUser } from "../services/taskService";

const Settings = () => {
    const [user, setUser] = useState(null);
    const { theme, toggleTheme } = useTheme();
    const [loading, setLoading] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const isModalOpen = showPasswordModal || showDeleteModal;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data);
            } catch (err) {
                console.error("Failed to fetch user", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);



    return (
        <DashboardLayout title="Settings" isModalOpen={isModalOpen}>
            <PageTransition>
                {loading ? (
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <Spinner size="lg" variant="primary" />
                    </div>
                ) : (
                    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">


                        <AnimatedPageHeader
                            title="Settings"
                            subtitle="Manage your account, security and preferences"
                        />

                        {/* ACCOUNT SETTINGS */}
                        <SectionCard title="Account">
                            <SettingRow
                                label="Username"
                                value={user?.username}

                            />


                            <SettingRow
                                label="Email"
                                value={user?.email}

                            />

                        </SectionCard>

                        {/* SECURITY */}
                        <SectionCard title="Security">
                            <SettingRow
                                label="Password"
                                description="Change your account password"
                                action={
                                    <button
                                        onClick={() => setShowPasswordModal(true)}
                                        className="px-4 py-2 rounded-xl bg-primary text-neutral-white text-sm hover:bg-primary-hover transition"
                                    >
                                        Change Password
                                    </button>
                                }
                            />
                        </SectionCard>

                        {/* PREFERENCES */}
                        <SectionCard title="Preferences">
                            <SettingRow
                                label="Theme"
                                description="Switch between light and dark mode"
                                action={
                                    <button
                                        onClick={toggleTheme}
                                        className="
        px-4 py-2 rounded-xl border dark:border-neutral-darkest
        bg-neutral-light dark:bg-neutral-darkest
        text-neutral-darkest dark:text-neutral-white
        font-body text-sm
        transition
      "
                                    >
                                        {theme === "light" ? "Dark" : "Light"}
                                    </button>
                                }
                            />


                            <SettingRow
                                label="Notifications"
                                description="Email notifications"
                                action={
                                    <span className="px-3 py-1 text-xs font-body font-medium rounded-full bg-neutral-light text-neutral-dark dark:bg-neutral-darkest dark:text-neutral-light">
                                        Coming Soon
                                    </span>
                                }
                            />

                        </SectionCard>

                        {/* DANGER ZONE */}
                        <SectionCard title="Danger Zone" danger>
                            <SettingRow
                                label="Delete Account"
                                description="This action is permanent and cannot be undone"
                                action={
                                    <button
                                        onClick={() => setShowDeleteModal(true)}
                                        className="px-4 py-2 rounded-xl bg-error text-neutral-white dark:text-neutral-darkest text-sm hover:bg-error/90 transition"
                                    >
                                        Delete Account
                                    </button>
                                }
                            />
                        </SectionCard>

                    </div>
                )}
            </PageTransition>

            {/* CHANGE PASSWORD MODAL */}
            {showPasswordModal && (
                <Modal
                    title="Change Password"
                    onClose={() => setShowPasswordModal(false)}
                >
                    <ChangePasswordForm onClose={() => setShowPasswordModal(false)} />
                </Modal>
            )}

            {showDeleteModal && (
                <Modal
                    title="Delete Account"
                    onClose={() => setShowDeleteModal(false)}
                >
                    <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
                </Modal>
            )}


        </DashboardLayout>
    );
};

const SectionCard = ({ title, children, danger = false }) => (
    <div
        className={`
      rounded-2xl border p-6 space-y-4
      ${danger
                ? "border-error/30 bg-error/5 dark:bg-error/10"
                : "border-neutral-light dark:border-neutral-darkest bg-neutral-white dark:bg-neutral-dark"
            }
    `}
    >
        <h2
            className={`
        font-heading text-lg font-semibold
        ${danger ? "text-error" : "text-neutral-darkest dark:text-neutral-white "}
      `}
        >
            {title}
        </h2>

        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const SettingRow = ({ label, value, description, action }) => (
    <div className="flex items-start justify-between gap-6">
        <div>
            <p className="font-body text-sm font-medium text-neutral-darkest dark:text-neutral-white">
                {label}
            </p>

            {value && (
                <p className="mt-1 font-body text-sm text-neutral-dark dark:text-neutral-light">
                    {value ?? "-"}
                </p>
            )}

            {description && (
                <p className="mt-1 font-body text-xs text-neutral-dark/80 dark:text-neutral-light/80">
                    {description}
                </p>
            )}
        </div>

        {action && <div>{action}</div>}
    </div>
);


export default Settings;
