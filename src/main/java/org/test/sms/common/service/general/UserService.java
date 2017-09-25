package org.test.sms.common.service.general;

import org.test.sms.common.entity.general.User;
import org.test.sms.common.enums.general.PermissionGroupType;
import org.test.sms.common.enums.general.PermissionType;
import org.test.sms.common.service.AbstractService;

public interface UserService extends AbstractService<User> {

    boolean hasPermission(PermissionGroupType permissionGroup, PermissionType permissionType);

    void resetPassword(long id);
}