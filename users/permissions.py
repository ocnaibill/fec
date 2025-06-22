from rest_framework.permissions import BasePermission

class IsCredentiator(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'credenciador'