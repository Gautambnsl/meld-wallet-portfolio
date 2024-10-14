const useDeleteRestricted = () => {
    // get all the current permissions of the admin
    const permission: any = localStorage.getItem('admin-permission');
    // get the current project name which one is selected
    const project: any = sessionStorage.getItem('menu-key');

    // example - permissions.banji.dashboard.view = true
    const deleteRestricted = (module: any) => {
        return JSON.parse(permission)?.[project]?.[module]?.delete;
    }

    return { deleteRestricted };
};

export default useDeleteRestricted;