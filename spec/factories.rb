FactoryGirl.define do

    factory :user do
        email "test100@example.com"
        password "test1234"
        password_confirmation "test1234"
        remember_me false
    end
    factory :user_with_invitation do
        email "test100@example.com"
        password "test1234"
        password_confirmation "test1234"
        remember_me false
        invitation { Invitation.create!(recipient_email:"test100@example.com") }
    end

    factory :invitation do
        recipient_email "test200@example.com"
        beta_key "123123"
    end
end