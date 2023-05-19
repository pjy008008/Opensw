from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from django.urls import reverse
from django.views.generic import TemplateView



class AccountActivateView(TemplateView):
    template_name = 'account_activation.html'

    def get(self, request, *args, **kwargs):
        try:
            uid = int(kwargs['uidb64'])
            token = kwargs['token']
            user = get_user_model().objects.get(pk=uid)
            if default_token_generator.check_token(user, token):
                user.is_active = True
                user.save()
                return redirect(reverse('account-activated'))
        except (TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):
            pass
        return redirect(reverse('account-activation-failed'))
