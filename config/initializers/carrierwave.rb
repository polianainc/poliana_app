CarrierWave.configure do |config|
  data = YAML.load_file "#{Rubber.root}/config/rubber/rubber-secret.yml"
  config.fog_credentials = {
    :provider               => "AWS",
    :aws_access_key_id      => "#{data['cloud_providers']['aws']['access_key']}",
    :aws_secret_access_key  => "#{data['cloud_providers']['aws']['secret_access_key']}",
    :path_style             => true
  }
  config.fog_directory  = "#{data['cloud_providers']['aws']['bucket']}"
end
