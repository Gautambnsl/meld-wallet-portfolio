const useUpdateRestricted = () => {
  // get all the current permissions of the admin
  const permission: any = localStorage.getItem('admin-permission');
  // get the current project name which one is selected
  const project: any = sessionStorage.getItem('menu-key');

  // example - permissions.banji.dashboard.view = true
  const updateRestricted = (module: any) => {
    return JSON.parse(permission)?.[project]?.[module]?.update;
  }

  return { updateRestricted };
}

export default useUpdateRestricted;