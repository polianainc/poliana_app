FactoryGirl.define do

    factory :user do
        email "test100@example.com"
        password "test1234"
        password_confirmation "test1234"
        remember_me false
    end

    factory :invitation do
        recipient_email "test2@example.com"
        association :sender, factory: :user
    end
end