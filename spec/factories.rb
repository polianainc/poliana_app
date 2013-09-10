FactoryGirl.define do

    factory :email_user do
        email "test@example.com"
        password "test1234"
        password_confirmation "test1234"
        remember_me false
    end

end