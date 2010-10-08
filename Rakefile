ssh_user = "user@example.com" # for rsync deployment
remote_root = "/home/user/demos.example.com/offline" # for rsync deployment
upload_files = "output"

task :copy do
  FileUtils.mkdir upload_files rescue nil
  ["index.html", ".htaccess", "notes.manifest", "javascripts"].each do |f|
    FileUtils.cp_r f, "#{upload_files}/#{f}"
  end
end

desc "Clears and generates new styles, builds and deploys"
task :deploy => :copy do
  puts "*** Deploying the site via SSH to #{ssh_user}"
  system("rsync -avz --delete #{upload_files}/ #{ssh_user}:#{remote_root}")
  FileUtils.rm_rf upload_files rescue nil
end


